#"coding=utf-8"
import tornado.httpserver
import tornado.web
import tornado.ioloop
import tornado.options
import os.path
from tornado.options import define, options
from condb import *
from temp import *
define("port", default=9000, type=int)

#基类
class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user")

#主页
class IndexHandler(BaseHandler):
    #@tornado.web.authenticated
    def get(self,cla):
       flag=self.get_current_user()
       try:
           status=checkstatus(1,flag)
       except:
           status=checkstatus(2,flag)
       re=displayMerchant(cla)
       self.render('shop.html',f=flag,re=re,s=status)
    def post(self,t):
        user = self.get_argument('name')
        phone = self.get_argument('phone')
        pwd=self.get_argument('pwd')
        adr=self.get_argument('address')
        f=adduser(user,phone,pwd,adr)
        if f==1:
            self.redirect('/login')
        else:
            self.render('regist.html',m='用户名被占用！')
#登陆功能

class LoginHandler(tornado.web.RequestHandler):
    def get(self):
        if(temp.flag==0):
            m = '用户名或密码错误！'
        else:
            m = ''
        self.render('login.html',m=m)

    def post(self):
        name = self.get_argument('name')
        pas = self.get_argument('password')
        status=self.get_argument('status')
        #print name,pas,status
        if(checkuser(name,pas,status)):
            self.set_secure_cookie('user', name)#身份验证完成，则设置cookie
            temp.flag=1
            if(status=='2'):
               self.redirect('/')
            else:
                self.redirect('/seller')
        else:
            self.redirect('/login')
            temp.flag=0



#用户注册功能
class RegistHandler(BaseHandler):
    def get(self):
        self.render('regist.html',m='')


#退出登陆
class LogoutHandler(tornado.web.RequestHandler):
    def get(self):
        self.clear_cookie('user')
        self.redirect('/')

#用户个人中心
class PersonalHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        userinfo=getuserinfo(self.get_current_user())
        self.render('personal.html',user=self.get_current_user(),info=userinfo)

#商家个人中心
class SellerHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        id=self.get_current_user()
        re=searchMerchant(id)[0]
        self.render('seller.html',r=re,id=int(id))
    def post(self):
        #图片的暂存路径
        upload_path=os.path.join(os.path.dirname(__file__),'static/IMG')
        #提取表单中‘name’为‘file’的文件元数据
        file_metas=self.request.files.get('file',None)
        for meta in file_metas:
            filename=self.get_current_user()+'.jpg'
            filepath=os.path.join(upload_path,filename)
            #有些文件需要以二进制的形式存储，实际中可以更改
            with open(filepath,'wb') as up:
                up.write(meta['body'])
            updateSellerImage('IMG/'+filename,self.get_current_user()[0])
        self.redirect('/seller')



#商家具体页面
class MerchantHandler(BaseHandler):
    def get(self,id):
        flag=self.current_user
        re=searchCommodity(id)#获取指定ID商家信息
        name=searchMerchant(id)#获取指定ID商品信息
        am=getCartAmount(flag)
        self.render('merchant.html',re=re,name=name,f=flag,amount=am)

#修改用户登陆密码
class ChangePwd(BaseHandler):
    def get(self,id):
        self.render('changepwd.html',id=id)
    def post(self,id):
        newp=self.get_argument('newpassword')
        changePwd(id,newp)
        self.render('pwdsuccess.html')
#修改商家登陆密码
class ChangeSPwd(BaseHandler):
    def get(self,id):
        self.render('changespwd.html',id=id)
    def post(self,id):
        newp=self.get_argument('newpassword')
        changeSPwd(id,newp)
        self.render('pwdsuccess.html')

#修改用户手机号
class ChangePhone(BaseHandler):
    def get(self,id):
        self.render('changephone.html',id=id)
    def post(self,id):
        newph=self.get_argument('newphone')
        changePhone(id,newph)
        self.redirect('/self')

#修改用户收货地址
class ChangeAddress(BaseHandler):
    def get(self,id):
        self.render('changeaddress.html',id=id)
    def post(self,id):
        newad=self.get_argument('newaddress')
        changeAddress(id,newad)
        self.redirect('/self')

#将商品加入购物车
class SelectHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self,id):
        addShopcart(id,getuserinfo(self.get_current_user())[0].id)
        self.redirect(self.request.headers['referer'])#跳转前一个页面

#购物车
class ShoppingHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        re=displaycart(getuserinfo(self.get_current_user())[0].id)
        s=sum(re)
        self.render('shopcart.html',re=re,s=s)


#购物车删除操作
class ShopDeleteHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self,id):
        outShopcart(id,getuserinfo(self.get_current_user())[0].id)
        self.redirect('/shopcart')

#提交订单
class PostMerchantHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        user=self.get_current_user()
        consumer=getuserinfo(user)
        flag=postmerchant(consumer)
        if(flag==1):
            DeleteAllcart(consumer)
            self.render('success.html')
        else:
            self.redirect('/shopcart')

#商家查看所有商品
class AllgoodsHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self,sid):
        r=seegoods(sid)
        self.render('allgoods.html',re=r,sid=sid)

#商家编辑商品信息
class EditGoodsHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self,id):
        re=searchGoods(id)[0]
        self.render('editgoods.html',r=re)
    def post(self,id):
        name=self.get_argument('name')
        price=self.get_argument('price')
        amount=self.get_argument('amount')
        updategoods(name,price,amount,id)
        sid=self.get_current_user()[0]
        target='/allgoods/'+sid
        self.redirect(target)

#商家删除商品信息
class DeleteGoodsHandler(BaseHandler):
    def get(self,id):
        DeleteGoods(id)
        sid=self.get_current_user()[0]
        updateAmount(sid)
        target='/allgoods/'+sid
        self.redirect(target)
#商家添加商品信息
class AddGoodsHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('addgoods.html')
    def post(self):
        #图片的暂存路径
        upload_path=os.path.join(os.path.dirname(__file__),'static/IMG')
        #提取表单中‘name’为‘file’的文件元数据
        file_metas=self.request.files.get('file',None)
        name=self.get_argument('name')
        price=self.get_argument('price')
        amount=self.get_argument('amount')
        sid=self.get_current_user()[0]
        total_goods=getGoodsAmount(self.get_current_user()[0])[0].total_goods
        for meta in file_metas:
            filename=sid+'-'+str(total_goods+1)+'.jpg'
            filepath=os.path.join(upload_path,filename)
            #有些文件需要以二进制的形式存储，实际中可以更改
            with open(filepath,'wb') as up:
                up.write(meta['body'])
            addgoods(name,price,int(self.get_current_user()[0]),'IMG/'+filename,amount)
        updateAmount(sid)#更新商家商品总数
        target='/allgoods/'+sid
        self.redirect(target)

#商家入驻
class AddSellerHandler(BaseHandler):
    def get(self):
        self.render('sregist.html')
    def post(self):
        name=self.get_argument('name')
        pwd=self.get_argument('pwd')
        cla=self.get_argument('class')
        sid=addseller(name,pwd,cla)
        self.render('sresuccess.html',sid=sid)

#会员查看我的订单
class RecordUserHandler(BaseHandler):
    def get(self):
        re=recordUser(getuserinfo(self.get_current_user())[0].id)
        self.render('urecord.html',re=re)


#主运行
if __name__ == "__main__":
    settings = {
    "template_path": os.path.join(os.path.dirname(__file__), "templates"),
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "cookie_secret": "pn6OqYE4RNi012c1pcF26gbDQTiEA07Ynniqz+TGyAw=",
    "xsrf_cookies": False,
    "login_url": "/login"
    }
    #路由表
    Handlers = [(r'/login', LoginHandler),
              (r'/(\d*)', IndexHandler),
                (r'/seller',SellerHandler),
              (r'/regist',RegistHandler),
              (r'/logout',LogoutHandler),
              (r'/merchant/(\d+)',MerchantHandler),
                (r'/password/(\d+)',ChangePwd),
                (r'/spassword/(\d+)',ChangeSPwd),
                (r'/phone/(\d+)',ChangePhone),
                (r'/address/(\d+)',ChangeAddress),
                (r'/self',PersonalHandler),
                (r'/add/(\d+)',SelectHandler),
                (r'/shopcart',ShoppingHandler),
                (r'/outshop/(\d+)',ShopDeleteHandler),
                (r'/post',PostMerchantHandler),
                (r'/allgoods/(\d+)',AllgoodsHandler),
                (r'/edit/(\d+)',EditGoodsHandler),
                (r'/delete/(\d+)',DeleteGoodsHandler),
                (r'/addgoods',AddGoodsHandler),
                (r'/sregist',AddSellerHandler),
                (r'/urecord',RecordUserHandler)]
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=Handlers, **settings )
    http_sever = tornado.httpserver.HTTPServer(app)
    http_sever.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
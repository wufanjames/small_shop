#"coding=utf-8"
import time
import torndb
import temp
db = torndb.Connection(host = 'localhost',database ='shop',user = 'root',password = 'testpassword')
SUM=0

#Md5加密
def md5(str):
    import hashlib
    m = hashlib.md5()
    m.update(str)
    return m.hexdigest()

#获取当前系统时间
def GetNowTime():
    return time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
#会员注册功能数据库交互
def adduser(name,phone,pwd,address):
    password=md5(pwd)
    sql = "insert into user (name,phone,password,address) values ('%s','%s','%s','%s')" % (name,phone,password,address)
    sql2="select * from user where name='%s'"%(name)#会员用户名不允许重复
    r=db.query(sql2)
    if(len(r)==0):
        db.execute(sql)
        flag=1
    else:
        flag=0
    return flag

#商家入驻功能数据库交互
def addseller(name,pwd,cla):
    password=md5(pwd)
    sql = "insert into seller (name,password,class) values ('%s','%s','%s')" % (name,password,cla)
    sql2="select id from seller where name='%s' and password='%s'"%(name,password)
    db.execute(sql)
    re=db.query(sql2)
    return re[0]

#商家添加商品数据库交互
def addgoods(name,price,seller,image,amount):
    t=GetNowTime()
    sql = "insert into goods (name,price,online_time,total_amount,seller,image) values ('%s','%s','%s','%s','%s','%s')" % (name,price,t,amount,seller,image)
    sql2="select * from goods where name='%s'and seller='%s'"%(name,seller)#同一家商店商品名称不允许重复
    r=db.query(sql2)
    if(len(r)==0):
        db.execute(sql)
        flag=1
    else:
        flag=0
    return flag


#登陆功能数据库交互
def checkuser(name, pwd,status):
    password=md5(pwd)
    print status
    if status=='2':
        sql = "select * from user where name='%s' and password='%s'" % (name, password)
    else:
        sql="select * from seller where id='%s' and password='%s'" % (name, password)
    result=db.query(sql)
    if(len(result) == 0):
        return False
    else:
        if(status=='2'):
            updatetime(name)
        return True

#更新用户登陆时间
def updatetime(name):
    time=GetNowTime()
    sql="UPDATE user SET last_time='%s' WHERE name='%s'"%(time,name)
    db.execute(sql)

#显示商家信息
def displayMerchant(cla):
    if(cla):
        sql="select * from seller where class='%s'"%(cla)
    else:
        sql="select * from seller"
    result=db.query(sql)
    return result
#搜索商家flag
def sellerflag(id):
    sql="select * from seller where id=%s"%(int(id))
    res=db.query(sql)
    return res
#获取用户信息
def getuserinfo(name):
    sql="select * from user where name='%s'"%(name)
    re=db.query(sql)
    return re

#搜索指定商家信息
def searchMerchant(id):
    sql='select * from seller where id=%s'%(int(id))
    result=db.query(sql)
    return result
#搜索指定商家商品
def searchCommodity(id):
    sql='select * from goods where seller=%s'%(id)
    result=db.query(sql)
    return result

#搜索制定商品信息
def searchGoods(id):
    sql="select * from goods where id='%s'"%(id)
    re=db.query(sql)
    return re


#修改指定用户密码
def changePwd(id,newp):
    nnewp=md5(newp)#MD5加密
    sql="UPDATE user SET password='%s' WHERE id='%s'"%(nnewp,id)
    db.execute(sql)

#修改指定商家密码
def changeSPwd(id,newp):
    nnewp=md5(newp)#MD5加密
    sql="UPDATE seller SET password='%s' WHERE id='%s'"%(nnewp,id)
    db.execute(sql)

#修改指定用户手机号
def changePhone(id,newph):
    sql="UPDATE user SET phone='%s' WHERE id='%s'"%(newph,id)
    db.execute(sql)
    print 'flag changephone'

#修改指定用户收货地址
def changeAddress(id,newad):
    sql="UPDATE user SET address='%s' WHERE id='%s'"%(newad,id)
    db.execute(sql)


#添加购物车
def addShopcart(goods,consumer):
    sql="insert into shopcart (consumer,content) values ('%s','%s')"%(consumer,goods)
    db.execute(sql)
#购物车展示
def displaycart(userid):
    Range='('
    sql="select * from shopcart where consumer='%s'"%(userid)
    re=db.query(sql)
    for r in re:
        Range+=str(r.content)
        Range+=','
    length=len(Range)
    if length>1:
        rrange=Range[0:length-1]
    else:
        rrange=Range
    rrange+=')'
    if(rrange!='()'): #不为空
         sql2="select * from goods where id in %s"%rrange
    else:
        sql2="select * from goods where id=0"#搜索空值
    res=db.query(sql2)
    return res

#移除购物车
def outShopcart(goodsid,userid):
    sql="delete from shopcart where content='%s' and consumer='%s'"%(goodsid,userid)
    db.execute(sql)
#清空购物车
def DeleteAllcart(consumer):
    userid=consumer[0].id
    sql="delete from shopcart where consumer='%s'"%(userid)
    db.execute(sql)
#计算商品总额
def sum(res):
    s=0
    if(len(res)):
        for r in res:
            s+=float(r.price)
    return s


#显示我的订单
def displaymerchant(llist):
    range='('
    for i in llist:
        range+=str(i)
        range+=','
    l=list(range)
    l[-1]=')'
    ran=''.join(l)
    sql="select * from goods where id in %s"%ran
    res=db.query(sql)
    return res



#提交订单
def postmerchant(consumer):
    f=0
    commodity=''
    sql0="select * from shopcart where consumer='%s'"%(consumer[0].id)
    res=db.query(sql0)
    for r in res:
        #拼接字符串
        t=str(r.content)
        t=t+'|'
        commodity+=t
        #更新商品被购买次数
        sql1='UPDATE goods SET total_sell=total_sell+1 WHERE id=%s'%(r.content)
        #更新商品库存
        sql4="UPDATE goods SET total_amount=total_amount-1 WHERE id=%s"%(r.content)
        #更新商家销量
        rre=searchGoods(r.content)
        sql5="UPDATE seller SET total_sell=total_sell+1 WHERE id=%s"%(rre[0].seller)
        #更新商家产生的平台费用
        sql6="UPDATE seller SET platform_cost=platform_cost+2 WHERE id=%s"%(rre[0].seller)
        db.execute(sql1)
        db.execute(sql4)
        db.execute(sql5)
        db.execute(sql6)
    s=sum(displaycart(consumer[0].id))
    #生成订单
    t=GetNowTime()
    sql2="INSERT INTO record  ( money, time,content,consumer) VALUES ('%s', '%s', '%s','%s')"%(s,t,commodity,consumer[0].id)
    db.execute(sql2)
    f=1
    return f


#获取指定用户信息:
def getuserinfo(name):
    sql="select * from user where name='%s'"%name
    re=db.query(sql)
    return re
#获取指定商家ID
def getsellerID(name):
    sql="select id from seller where name='%s'"%(name)
    re=db.query(sql)
    return re[0].id
#获取指定商品所属的商家
def getmerchant(id):
    sql='select * from seller where id=%s'%id
    re=db.query(sql)
    return re

#获取购物车总数
def getCartAmount(username):
    if(username):
        userid=getuserinfo(username)[0].id
        sql="select count(*) from shopcart where consumer=%s"%(userid)
    else:
        sql="select count(*) from shopcart where consumer=0"
    re=db.query(sql)
    return re

#商家查看商品
def seegoods(sid):
    sql="select id,name,price,total_amount from goods where seller=%s"%(sid)
    re=db.query(sql)
    return re

#商家修改商品信息数据库操作
def updategoods(name,price,amount,id):
    sql="update goods set name='%s',price='%s',total_amount='%s' where id=%s"%(name,price,amount,int(id))
    db.execute(sql)

#商家删除商品信息数据库操作
def DeleteGoods(id):
    sql="delete from goods where id=%s"%(int(id))
    db.execute(sql)

#获取商家当前商品数
def getGoodsAmount(sid):
    sql="select total_goods from seller where id=%s"%(int(sid))
    re=db.query(sql)
    return re

#更新商家商品数
def updateAmount(sid):
    sql2="update seller set total_goods=total_goods+1 where id=%s"%(int(sid))
    db.execute(sql2)

#验证身份是商店还是会员
def checkstatus(flag,info):
    if(flag==1 and info!=None):
        sql="select flag from seller where id=%s"%(int(info))
        re=db.query(sql)
        return re[0].flag
    elif(flag==2 and info!=None):
        sql="select flag from user where name='%s'"%(info)
        re=db.query(sql)
        return re[0].flag
    else:
        return 0
#更新商家图片
def updateSellerImage(img,sid):
    sql="update seller set image='%s' where id=%s"%(img,int(sid))
    db.execute(sql)

#订单内容字符串分割
def content(string):
    list=string.split('|')
    return list

#用户订单查询
def recordUser(cid):
    sql="select * from record where consumer='%s'"%(cid)
    re=db.query(sql)
    return re



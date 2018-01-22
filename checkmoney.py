#"coding=utf-8"
import torndb
db = torndb.Connection(host = 'localhost',database ='course',user = 'root',password = 'testpassword')

def checkmoney():
    sql1="select income from merchant where id=1"
    re1=db.query(sql1)
    print '商家1总收入:',
    print re1[0].income
    sql2="select sum(money) from sellrecord"
    re2=db.query(sql2)
    print '订单中商家1总收入:',
    print re2[0]['sum(money)']
    print'==============================='
    sql3="select cost from userlist where id=1"
    re3=db.query(sql3)
    print '用户1的总消费：',
    print re3[0].cost
    sql4="select sum(money) from sellrecord where consumer=1"
    re4=db.query(sql4)
    print '订单中用户1的总消费：',
    print re4[0]['sum(money)']






checkmoney()

PICMEUP (API)
เครื่องมือในการพัฒนา
NodeJS
Express
MongoDB

- Download NodeJS https://nodejs.org/en/download/current/ เป็นเครื่องมือในการ run server
- Download MongoDB https://www.mongodb.com/download-center/community ตัว database ใช้เก็บข้อมูลเป็นแบบ json
- Download Studio 3T https://studio3t.com/download/ เครื่องมือในการจัดการ database ทำการติดตั้งโปรแกรมทั้ง 3 ตัวที่กล่าวมาข้างต้น

- เปิด cmd ใช้คำสั่ง npm -v เพื่อตรวจสอบว่าติดตั้งสำเร็จหรือไม่
- ใช้คำสั่ง npm install  เพื่อทำการติดตั้งตัว Express และ Modules อื่นๆ
- เปิดโปรแกรม  Studio 3T เพื่อทำการจัดการ Database
- Connect กับ local server
- คลิ๊กขวาที่ตัว local server และเลือก Add Database …
- สร้าง Database ชื่อ picmeup
- คลิ๊ก Database picmeup และคลิ๊ก Collections(0) จากนั้นคลิ๊กขวาเลือก Import Collections…
-  เลือก JSON - mongo shell / Studio 3T / mongoexport
- กด Next จากนั้นกดเครื่องหมาย + เพื่อเพิ่มไฟล์
- เลือกไฟล์ในโฟลเดอร์ collectios ทั้งหมด 
- กด Next
- กด Next
- กด Start Import
- ไฟล์จะมาปรากฏใน collections
- ใช้คำสั่ง node server.js เพื่อทำการ runตัว API

**ถ้าหากมีการปิดใช้ บริการ SPACE ของ Digital Ocean อาจทให้รูปภาพไม่ขึ้น

รายชื่อสมาชิก
1. นาย ปฏิพัทธ์ เรืองสวัสดิ์ 
58130500048 
patipat.ru@gmail.com 
0805958246 26/770 
ม.1 หมู่บ้านแฟมิลีปาร์ค ต.นาป่า อ.เมือง จ.ชลบุรี 20000

2. นาย พาทิศ จงศิริวาณิช 
58130500056 
ice_ro.patis@hotmail.com 
0988320601 
45/81 ซอยบางบอน3ซอย14 แขวงหลักสอง เขตบางแค กรุงเทพ 10160

3.นาย รวิชญ์ ศุภธนกร 
58130500061
rawit_ham@hotmail.com
0852807120
2/23 ซอย 8 ถนนลงหาดบางแสน ตำบลแสนสุข อำเภอเมือง จังหวัดชลบุรี 20130

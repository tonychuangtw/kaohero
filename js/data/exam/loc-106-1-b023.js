/* 106 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-106-1-b023'] = {
 "id": "loc-106-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 106,
 "nth": 1,
 "code": "106190",
 "subj": "b023",
 "title": "106 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "關聯式資料庫（relational database）中有兩個表格為 students 和 takes，這兩個表格只共用屬性 id，當要用此屬性連接兩個表格時，只要取出兩個表格皆出現的資料列（tuple），則應該使用下列那個 SQL指令（根據 ISO 頒布的 SQL 標準語法）？",
   "o": [
    "SELECT * FROM students NATURAL INNER JOIN takes;",
    "SELECT * FROM students LEFT OUTER JOIN takes USING (id);",
    "SELECT * FROM students RIGHT OUTER JOIN takes ON students.id = takes.id;",
    "SELECT * FROM students NATURAL FULL OUTER JOIN takes;"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於資料庫管理系統中的功能模組？",
   "o": [
    "資料定義語言編譯器（data definition language compiler）",
    "資料操作語言編譯器（data manipulation language compiler）",
    "主體語言編譯器（host language compiler）",
    "程式語言編譯器（programming language compiler）"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列何者是八進制數字 112.4 的十進制表示法？",
   "o": [
    "(78.25)10",
    "(74.5)10",
    "(92.75)10",
    "(70.25)10"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "最適合做為外部排序的方法是：",
   "o": [
    "Merge sort",
    "Insert sort",
    "Quick sort",
    "Bubble sort"
   ],
   "a": 0
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "一個全加器（Full Adder）的邏輯電路，無法透過下列那一個選項的邏輯閘組合而成？",
   "o": [
    "NAND",
    "NOR",
    "AND, OR, XOR",
    "XOR, NOT"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "一張 1600×900 像素全彩影像，在不壓縮且不包含其它資訊的情況下，其資料量約為多少 KByte？",
   "o": [
    "1440",
    "2829",
    "4218",
    "5659"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "作業系統不提供下列何種服務？",
   "o": [
    "控制 I/O",
    "記憶體分配",
    "CPU 行程監控",
    "偵測病毒入侵"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "Module-N 計數器如下圖所示，其中(D3D2D1D0)2 表示資料輸入位元，(Q3Q2Q1Q0)2 表示資料輸出位元，其餘控制位元具有下表之操作特性，試問該計數器為何種計數器？Clock Clear0 LoadQ01 CountQ1D0Q2D1 Clear Clock Load Count 功能說明Q3D2 0 × × × Clear to 01 1 × Load input0 D31 0 1 Count next binary state1 0 0 No change",
   "o": [
    "Module-9 計數器",
    "Module-10 計數器",
    "Module-15 計數器",
    "Module-16 計數器"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "採用虛擬記憶體（Virtual memory）的主要目的不包含下列何者？",
   "o": [
    "可提供對程式執行空間的保護",
    "讓多個程式間可以共享記憶體",
    "節省程式執行之功率消耗",
    "使單一程式的程式大小超過系統之主記憶體大小"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列那一項週邊對於計算機系統上直接記憶體存取（DMA）的機制需求最高？",
   "o": [
    "鍵盤",
    "繪圖卡",
    "滑鼠",
    "遊戲搖桿"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列四個數 A=(010 110 011 010)2，B=(2642)8，C=(59B)16，D=(1536)10，其大小關係何者正確？",
   "o": [
    "D>B>C>A",
    "B>C>D>A",
    "D>B>A>C",
    "C>B>D>A"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "某嵌入式處理器僅具有加法器（adder）與移位器（shifter），而不具備乘法器。欲執行運算 F=A*10，下列運算方式何者正確？",
   "o": [
    "F=A<<4",
    "F=(A<<3)+(A<<1)",
    "F=A<<5-A<<2",
    "F=A<<3+A<<2"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列何者為氣泡排序法（bubble sort）在最糟情況（worst case）下的計算時間複雜度？",
   "o": [
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n2)"
   ],
   "a": 3
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下圖 expression tree 所表示的運算為何？*+ *x -a bc d",
   "o": [
    "(a+b)*(x*(c-d))",
    "a+b*x*(c-d)",
    "a+b*x+c-d",
    "(a+b)*(x+c)-d"
   ],
   "a": 0
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "在二元樹中，令 N0 為沒有分枝（branch）的節點（node）個數，N1 為有一個分枝的節點個數，N2 為有二個分枝的節點個數。則下列等式何者正確？",
   "o": [
    "N0＝N2＋1",
    "N0＝N2－1",
    "N1＝N2＋1",
    "N1＝N2－1"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "每個陣列在宣告時並不需要那種外顯或隱含的資訊？",
   "o": [
    "陣列的名稱",
    "陣列的資料型態",
    "陣列要儲存的第一個資料值",
    "陣列的索引集合"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 2,
   "needfig": true,
   "fig": "img/q/106190_432_2513_17.webp"
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "關於雙向佇列的敘述，下列何者錯誤？",
   "o": [
    "同時有著堆疊（Stack）和佇列（Queue）的功效可以透過陣列（Array）來實作",
    "可以透過陣列來實作",
    "可以透過雙向鏈結串列（Doubly Linked List）來實作",
    "只可以透過單向鏈結串列（Linked List）來實作"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式碼後，j 的值為何？int i=0,j=2;if (i = 0)j += 1;elsej -= 1;",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是用來計算最小成本生成樹（minimum-cost spanning tree）的演算法？",
   "o": [
    "克羅斯科法（Kruskal's Algorithm）",
    "普林法（Prim's Algorithm）",
    "索林法（Sollin's Algorithm）",
    "戴克斯楚法（Dijkstra's Algorithm）"
   ],
   "a": 3
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "針對下圖的 graph 以 depth-first traversal 進行探索。下列各節點（vertex）訪問順序中，何者不可能是其訪問順序？g fc a d ebh i kj",
   "o": [
    "a, g, c, b, h, j, i, k, d, e, f",
    "a, g, f, e, d, b, c, h, i, j, k",
    "a, g, d, c, e, f, b, h, i, j, k",
    "a, d, e, f, g, c, b, h, j, i, k"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列何者數值與其他選項不同？",
   "o": [
    "(10111001)2",
    "(B9)16",
    "(271)8",
    "(181)10"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int A[4][4]={1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4};int total=0;for(int i=0;i<4;i++)for(int j=0;j<4;j++){if((i+j)>5) break;total+=A[i][j];}cout<<total<<endl;return 0;}",
   "o": [
    "26",
    "30",
    "36",
    "40"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "二元樹尋訪（Traversal）方式有：先序（Pre-order）、中序（In-order）、後序（Post-order）及分支度（Degree，各節點子節點數）。下列那種表示，無法重新建構原二元樹結構？",
   "o": [
    "先序+分支度",
    "先序+中序",
    "後序+中序",
    "先序+後序"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "請問下列 Java 程式的執行結果為何？class B {public int ID;public B( int w) { ID=w; }public B() { this(300); }public void speak() {System.out.println(\"我的編號是\" + ID);}}class C extends B {public String name;public C(String n, int w) {super(w);name = n;}public C() { this(\"小英\", 789); }public void speak() {System.out.println(\"我是\" + name);System.out.println(\"我的編號是\" + ID);}}class A {public static void main(String[] args) {B staff1, staff2;staff1 = new C(\"小明\", 543);staff2 = new C();staff1.speak();staff2.speak();}}",
   "o": [
    "我是小明 我的編號是 543 我是小英 我的編號是 789",
    "我是小明 我的編號是 543 我是小明 我的編號是 300",
    "我是小明 我的編號是 543",
    "我是小明 我的編號是 300"
   ],
   "a": 0
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "在 C 程式語言中，下列那個命令可以立即離開目前正在執行的函數，並且把控制權直接交還給呼叫者？",
   "o": [
    "break",
    "return",
    "continue",
    "while"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言執行完畢後，會印出幾個*號？#include<stdio.h>int main(){int i, j;for (i=2, j=3; i<= 2*j; i++, j-=2){printf(\"*\");}return 0;}",
   "o": [
    "6",
    "2",
    "1",
    "3"
   ],
   "a": 2
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "關於 TCP 埠號（port number）使用的敘述，下列何者錯誤？",
   "o": [
    "埠號 80 是 HTTP",
    "埠號 23 是 Telnet",
    "埠號 20 及 21 是 FTP",
    "埠號 26 是 SMTP"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列何者是一種宣告式程式語言（declarative programming language）？",
   "o": [
    "Pascal",
    "Prolog",
    "Scheme",
    "Smalltalk"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "執行下列 Java 程式後，產生的輸出為何？class Test{public static void main(String[] args){Test p = new Test();p.start();}void start(){boolean b1 = false;boolean b2 = false;fix(b1);System.out.println(b1 + \" \" + b2);}void fix(boolean b1){b1 = true;}}",
   "o": [
    "false false",
    "false true",
    "true true",
    "true false"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int k=0;for(int i=0;i<5;i++){for(int j=0;j<5;j++){if(j%2) k=k+j;}}cout<< k <<endl;return 0;}",
   "o": [
    "15",
    "20",
    "30",
    "50"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "目前在世界上主要使用的網路通訊協定為何？",
   "o": [
    "TCP/IP",
    "HTTP",
    "UDP",
    "P2P"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於編譯式程式語言（compiled language）？",
   "o": [
    "Perl",
    "BASIC",
    "VBScript",
    "C++"
   ],
   "a": 3
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "IEEE 802.11 無線網路中，可送出何種訊息來解決隱藏節點（hidden node）的問題？",
   "o": [
    "ACK",
    "RTS/CTS",
    "Beacon",
    "Jamming signal"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "宣稱實體訊息來源是否與真實實體訊息來源相吻合的過程，為下列何者？",
   "o": [
    "識別性（Identity）",
    "完整性（Integrity）",
    "可用性（Availability）",
    "鑑別性（Authentication）"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列何種網路應用協定會建立分開的控制與資料連線？",
   "o": [
    "HTTP",
    "FTP",
    "SMTP",
    "POP3"
   ],
   "a": 1
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "對每個網路設備而言，下列何者是獨一無二的？",
   "o": [
    "序號",
    "IP 位址",
    "網卡位址",
    "編號"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列那個方法不屬於對通行密碼（ID-Password）之安全威脅？",
   "o": [
    "網頁釣魚",
    "社交工程",
    "字典攻擊法",
    "SYN 攻擊法"
   ],
   "a": 3
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "封包過濾式防火牆是第一代防火牆，在封包過濾的過程中，下列何種資訊是它無法檢查的？",
   "o": [
    "來源地的 IP 位址",
    "傳送的資料內容",
    "目的端的傳輸埠",
    "通訊協定種類"
   ],
   "a": 1
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "同儕架構（peer-to-peer paradigm）常常被用於檔案分享，下列敘述何者錯誤？",
   "o": [
    "在此架構中，伺服器行程不需要永遠執行與持續等待客戶行程的連線要求，此職責被分擔給所有同儕電腦",
    "無須架設昂貴的伺服器是此架構的優點",
    "同儕架構中，電腦可以為提供服務者，亦可為被服務者，但不可以同時為服務者與被服務者",
    "音樂檔案分享服務 Napster，即屬於同儕架構"
   ],
   "a": 2
  }
 ]
};

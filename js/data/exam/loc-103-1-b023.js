/* 103 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-103-1-b023'] = {
 "id": "loc-103-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 103,
 "nth": 1,
 "code": "103180",
 "subj": "b023",
 "title": "103 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "在資料庫產生資料表的 SQL 語法中，如果在 create table 的指令中，加入了 on update cascade，其目的是為了 使得資料庫具有何種特性？",
   "o": [
    "一致性",
    "獨立性",
    "完整性",
    "安全性"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫（relational database）中，若要表示每個員工（employee）有一個不會和他人重複的編號（id）、一個姓名（name）和很多個電話號碼（tel），我們不會定義成一個關聯：employee（id,name,tel），而是定義成兩個關聯：employeel （id,name）和 employee2 (id,tel）。這樣做的目的是為了符合下列那種正規式（normalform）的要求？第一正規式（first normal form） ＿＿＿ 第二正規式（second normal form）第三正規式（third normal form） ＿＿＿ BC 正規式（Boyce-Codd normal form）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/103180_436_2213_2.webp",
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列何者為八進位數(42)8 與八進位數(24)8 相減的結果？",
   "o": [
    "(18)8",
    "(16)8",
    "(14)8",
    "(12)8"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "十六位元（bit）無號整數（unsigned integer）所能表示的最大數值為何？",
   "o": [
    "32767",
    "32768",
    "65535",
    "65536"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "若欲使用 Verilog 語言合成（synthesize）出與下圖相同功能的電路，則下列各 Verilog 模組何者正確？",
   "o": [
    "A",
    "D",
    "XBYCclock",
    "module TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;reg Y;always @(posedge clock) X <= A | B;always @(B or C) Y = B & C; endmodulemodule TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;reg Y;always @(posedge clock) X <= A | B;always @(posedge clock) Y = B & C; endmodulemodule TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;wire Y;always @(posedge clock) X = A | B;always @(posedge clock) Y = B & C;endmodulemodule TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;reg Y;always @(posedge clock) X <= A+B;always @(B or C) Y = B * C;endmodule"
   ],
   "a": 0
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "一數位計算機使用 16 位元指令（instruction），該指令分成 3 個欄位：Opcode 欄位、暫存器位址欄位（register address field）、立即運算元（immediate operand）欄位。若該指令集可支援 110 個不同的運算與 32 個暫存 器，試問該指令中的 opcode 至少需要幾個位元？",
   "o": [
    "6",
    "7",
    "8",
    "9"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "在 I /O 控制技術中，下列何者指的是數據可不經由中央處理器而在 I /O 設備及主記憶體間傳輸？",
   "o": [
    "programmed I /O",
    "interrupt-driven I /O",
    "isolated I /O",
    "DMA"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列各種現行常用的記憶體中，何者一旦失去電源供應後資料就會消失？",
   "o": [
    "靜態隨機存取記憶體（static RAM）",
    "可清除及可程式的唯讀記憶體（EPROM）",
    "可用電的方式清除及可程式的唯讀記憶體（EEPROM）",
    "快閃記憶體（flash memory）"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "布林函數 Y = A + AB + ABC + ABCD 可化簡為下列何者？",
   "o": [
    "Y=A+C",
    "Y=A+B",
    "Y=A+D",
    "Y=A"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列電路中，何者為循序電路（sequential circuit）？ ＿＿＿ A ＿＿＿ A",
   "o": [
    "SSBCAS11",
    "DX",
    "BSS0D",
    "Cclock"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 系統上，下列關於掛載點（mount point）的敘述何者錯誤？",
   "o": [
    "掛載點可為一般檔案（regular file）",
    "掛載點可為空目錄（empty directory）",
    "掛載點可為非空目錄（non-empty directory）",
    "一般作業系統可允許多個掛載點"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 系統中，下列何者可列出目前路徑中所有的檔案？",
   "o": [
    "使用 vi 指令",
    "使用 ls 指令",
    "使用 mount 指令",
    "使用 man 指令"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "三個程序 A、B、C 已依序送入電腦等待執行，且它們所需的執行時間分別是 10、8、13 個單位時間。如果 該電腦使用依序循環（round robin）排程演算法來執行該等程序，且每個時間切割（time quantum）為 5 個 單位，則該三個程序的平均等待時間為若干單位？",
   "o": [
    "6.2",
    "14.33",
    "9.33",
    "8.67"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "假設記憶體中儲存一個整數（Integer）資料必須使用 4 個位元組（Byte），若一整數陣列（Array）宣告為 A[m][n]且 A[0][0]為其第一個元素。若 A[3][11]儲存於記憶體中之位址（Address）為 146774，又 A[8][2]儲 存於記憶體中之位址（Address）為 147078，則下列各敘述何者正確？",
   "o": [
    "m 無法判斷其值，但 n<16",
    "n 無法判斷其值，但 m>22",
    "陣列 A 組成元素儲存於記憶體中之位置順序是依“行為主順序（Column major order）”之方式儲存",
    "陣列 A 至少有 153 個組成元素"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是作業系統所負責的工作項目？",
   "o": [
    "管理中央處理器（CPU）以求提高其使用率",
    "確認 CPU 的輸出是否正確",
    "分配記憶體給每個程序",
    "讓使用者可以容易地使用周邊設備"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "若堆疊中已存有 n 個元素（elements），則其 push 及 pop 之最差時間複雜度分別為何？（註：push 為加入 一元素到 stack 之動作，pop 為由 stack 取出一元素之動作。）",
   "o": [
    "push：θ(1)，pop：θ(1)",
    "push：θ(n)，pop：θ(1)",
    "push：θ(1)，pop：θ(n)",
    "push：θ(n)，pop：θ(n)"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "在一個空的二元搜尋樹（binary search tree）依序插入關鍵值（keys）5、4、1、3、2 後，則對於存有關鍵值 3 的節點，下列敘述何者正確？",
   "o": [
    "其兄弟節點（sibling）所存的關鍵值為 1",
    "其兄弟節點所存的關鍵值為 2",
    "其兄弟節點所存的關鍵值為 4",
    "其兄弟節點不存在"
   ],
   "a": 3
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列各圖（graph）何者不是樹狀結構（tree）？aa ＿＿＿ fb ＿＿＿ c ＿＿＿ b ＿＿＿ c ＿＿＿ ed ＿＿＿ g ＿＿＿ hd ＿＿＿ eia ＿＿＿ d ＿＿＿ e ＿＿＿ a ＿＿＿ d ＿＿＿ eb ＿＿＿ c ＿＿＿ b ＿＿＿ c",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/103180_436_2213_18.webp",
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下圖中所含的最小擴張樹（minimal spanning tree）其各邊為何？1 27 6 123 4(0,1),(0,2),(1,3),(3,5),(3,2),(1,4) (0,2),(2,3),(2,4),(4,5),(1,4)(0,1),(0,2),(1,3),(3,5),(5,4) (0,1),(1,3),(3,2),(1,4),(3,5)",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/103180_436_2213_19.webp",
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "一圖形（graph）有 n 個端點（vertices）以及 e 個邊（edges）。若用相鄰串列（adjacency list）來表示該圖 形，則決定該圖形有多少個邊所需之時間複雜度（time complexity）為何？",
   "o": [
    "O(n+e)",
    "O(e log n)",
    "θ(n2)",
    "O(n log n)"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "一般在處理資料排序時，下列那種排序法所需的儲存空間最多？",
   "o": [
    "氣泡排序法（bubble sort）",
    "插入排序法（insertion sort）",
    "快速排序法（quick sort）",
    "選擇排序法（selection sort）"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "循序搜尋法（sequential search）在最糟情況（worst case）下搜尋一個數字的時間複雜度為何？",
   "o": [
    "θ(1)",
    "θ(log n)",
    "θ(n)",
    "θ(n log n)"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "#include <stdio.h> int main(void) { int a[10]={0},i; printf(\"%p\", &(a[0])) ; printf(\"%p\", a) ; return 0; } 上述 C 程式，若執行「printf(\"%p\", &(a[0]));」輸出的結果為 0028FEF4，則繼續執行「printf(\"%p\", a);」將會 輸出：",
   "o": [
    "0",
    "10",
    "0028FEF4",
    "0028FEF8"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列的 C++語言程式執行後輸出為何？ ＿＿＿ #include <iostream> ＿＿＿ using namespace std; ＿＿＿ int x=0; ＿＿＿ class A ＿＿＿ { ＿＿＿ public: ＿＿＿ void fun(){x++;}; ＿＿＿ }; ＿＿＿ class B：public A ＿＿＿ { ＿＿＿ public: ＿＿＿ void fun(){x=0;}; ＿＿＿ }; ＿＿＿ class C：public A ＿＿＿ { ＿＿＿ public: ＿＿＿ void fun(){x--;}; ＿＿＿ }; ＿＿＿ int main() ＿＿＿ { ＿＿＿ A a; ＿＿＿ B b; ＿＿＿ C c; ＿＿＿ A * d[3]; ＿＿＿ d[0]=&a; ＿＿＿ d[1]=&b; ＿＿＿ d[2]=&c; ＿＿＿ for(int i=0;i<3;i++) d[i]->fun(); ＿＿＿ cout<<x; ＿＿＿ }",
   "o": [
    "3",
    "-1",
    "1",
    "0"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式的輸出應為何？ ＿＿＿ #include <stdio.h> ＿＿＿ int unknown(int array [], int size , int key) ＿＿＿ { ＿＿＿ int left = 0, right = size-1, middle; ＿＿＿ while( left <= right) ＿＿＿ {",
   "o": [
    "middle = (left+right) / 2;",
    "if( array[middle] == key){return( array[middle]);",
    "}",
    "else if( array[middle] > key)right = middle - 1;elseleft = middle + 1;"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行以下 C 語言撰寫之程式，下列敘述何者正確？ #include <stdio.h> #include <iostream> main() {",
   "o": [
    "int i=18, s=0;do",
    "{s=s+i;",
    "}while(i<18);",
    "printf(\"%d\",s);system(\"PAUSE\");"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列各 C 語言函式宣告中，何者錯誤？",
   "o": [
    "double fn(void);",
    "float fn(a,b,c,d);",
    "double fn(int,double,float);",
    "int fn(int a,double b,float);"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式後，產生的輸出為何？ #include <stdio.h> void foo(){ static int a = 0;",
   "o": [
    "int b = 0;",
    "a = a+1;",
    "b = b+1;",
    "printf(\"%d-%d;\", a, b);"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列的 C++語言程式執行後輸出為何？ ＿＿＿ #include <iostream> ＿＿＿ #include <string> ＿＿＿ using namespace std; ＿＿＿ int main() ＿＿＿ {",
   "o": [
    "int a=0, b=0;string * s1=new string(\"test\");string * s2=new string(\"test\");00",
    "02",
    "20",
    "22"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 C++程式語言具有的性質？",
   "o": [
    "封裝（encapsulation）",
    "繼承（inheritance）",
    "多型（polymorphism）",
    "垃圾收集（garbage collection）"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "請選出下列有關 IEEE 802.3 區域網路四項敘述的所有正確者：①通常使用 UTP（Unshielded Twisted Pair） 線為傳輸線 ②通常以基頻（Baseband）訊號來傳遞 ③訊號傳遞通常需經過數據機（modem）調變與解調變 ④通常採用 CSMA/CA 協定",
   "o": [
    "①②",
    "①③",
    "①②④",
    "③④"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "比較「以 ADSL modem 連上 Internet」與「以 cable modem 連上 Internet」，下列何者錯誤？",
   "o": [
    "前者多以星狀（star）架構佈建",
    "後者多以匯流排（bus）架構佈建",
    "前者的線材多是採用無遮蔽雙絞線（UTP）",
    "後者的線材多是採用光纖"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何種協定是在資料傳輸時，用以檢視已送達的資料封包中資料是否已毀損，若是則要求對方重新傳送？",
   "o": [
    "檔案傳輸協定",
    "網際網路協定",
    "錯誤更正協定",
    "狀態詢問協定"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列有關 Mobile IP 的敘述何者錯誤？",
   "o": [
    "Mobile node 擁有一個 permanent address，該 address 稱為 home address",
    "若採用 agent advertisement 方式取得目前網路的 foreign agent 的資訊時，mobile node 會等待該 foreign agent發送 router advertisement 封包若採用 agent solicitation 方式取得目前網路的 foreign agent 的資訊時，mobile node 會發送 router discovery",
    "封包去尋找 foreign agent",
    "Mobile node 在 foreign network 取得的 address 稱做 foreign address"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "網路電話需使用下列何種通訊協定？",
   "o": [
    "HTTP（hypertext transfer protocol）",
    "SIP（session initiation protocol）",
    "SSL（secure socket layer）",
    "TELNET（terminal emulation link network）"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "在蜂巢式行動電話網路中，下列那一種多工技術直到第三代（3G）方才被普遍採用？",
   "o": [
    "CDMA（Code Division Multiple Access）",
    "TDMA（Time Division Multiple Access）",
    "FDMA（Frequency Division Multiple Access）",
    "CSMA/CD（Carrier Sense Multiple Access with Collision Detection）"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "關於資訊安全的維護，下列何種性質，其所指的是資訊在利用、傳輸、儲存等過程中確保其不被竄改、遺失、 缺損？",
   "o": [
    "保密性（confidentiality）",
    "完整性（integrity）",
    "責任性（accountability）",
    "可用性（availability）"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "入侵偵測系統簡稱：",
   "o": [
    "DNS",
    "NFS",
    "IDS",
    "PKS"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "因為雲端運算的發展，下列那項攻擊或資安事件較以往更為嚴重？",
   "o": [
    "阻斷服務攻擊（DoS）",
    "分散式阻斷服務攻擊（DDoS）",
    "網路釣魚（phishing）",
    "資料外洩（data leakage）"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列 HTML 語法指的是那種功能？ <a href=\"./main.php\">連結</a>",
   "o": [
    "在背景中執行 main.php 程式",
    "編譯 main.php 程式碼",
    "關閉 main.php 網頁",
    "開啟 main.php 網頁"
   ],
   "a": 3
  }
 ]
};

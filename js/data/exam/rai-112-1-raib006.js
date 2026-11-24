/* 112 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-112-1-raib006'] = {
 "id": "rai-112-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 112,
 "nth": 1,
 "code": "112070",
 "subj": "raib006",
 "title": "112 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "下列何種技術，在單一個晶片裡面內含有 2 個以上的 CPU？",
   "o": [
    "叢集電腦（Cluster computers）",
    "多核心（Multi-Core）",
    "超執行緒（Hyper-Threading）",
    "複雜指令集（Complex Instruction Set Computer, CISC）"
   ],
   "a": 1
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列處理器指令集中，何者是 CISC（Complex Instruction Set Computer）指令集？①Intel x86 ②RISC-V③ARM ④Intel 8051 ⑤MIPS",
   "o": [
    "②③④",
    "①④",
    "①③",
    "③④⑤"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "十六進位數 B7 若以十進位表示時，其結果為下列何者？",
   "o": [
    "151",
    "167",
    "183",
    "199"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是死結（Dead lock）發生的必要條件？",
   "o": [
    "互斥（Mutual exclusion）",
    "飢餓（Starvation）",
    "不可搶先（No preemption）",
    "循環等待（Circular waiting）"
   ],
   "a": 1
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "十進位數值-21 以 8-bit two's complement 有號數編碼，下列何者正確？",
   "o": [
    "1001 0110",
    "1001 0101",
    "1110 1010",
    "1110 1011"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "對 01110110 和 10001101 按位元（bit-wise）進行 XOR 的運算，結果為下列何者？",
   "o": [
    "00000000",
    "00000100",
    "11111011",
    "11111111"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "某循序程式的執行時間中，有 80%的部分可被改寫為四個相同程式的 thread 平行執行，另外 20%的部分僅能循序執行。若將該程式以 multi-thread 的方式改寫並於四核心處理器上執行，所能獲得的加速（speedup）最大上限為何？",
   "o": [
    "2.0",
    "2.5",
    "3.0",
    "3.5"
   ],
   "a": 1
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列何類作業系統的特色，係針對特定用途去設計開發，可使用在小到玩具機器人、智慧手錶，大到汽車、工廠自動化設備上？",
   "o": [
    "專家系統（Expert System）",
    "分散式系統（Distributed System）",
    "虛擬機器（Virtual Machine）",
    "嵌入式系統（Embedded System）"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "假設某一張彩色影像的解析度為 1200×800，記錄每個像素的顏色需要 24 位元（R、G、B 各佔 8 位元），則在不壓縮的情況下，儲存該影像需要多少記憶體？",
   "o": [
    "960000 bytes",
    "2880000 bytes",
    "7680000 bytes",
    "23040000 bytes"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "有關電腦顯示卡的敘述，下列何者錯誤？",
   "o": [
    "顯示卡能夠將從電腦傳送來的訊號轉變為螢幕上視訊",
    "顯示卡中的記憶體稱為視訊記憶體",
    "顯示卡不可內建於主機板上",
    "它能夠決定螢幕的更新頻率、色彩總數以及解析度"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下圖的循序電路包含二個 D flip flops A 與 B 及一個輸入訊號 X。其行為以狀態轉換圖（state transitiondiagram）表示，何者正確？（狀態以\"AB\"表示之。例如：狀態 01 代表 A=0,B=1）A. B.C. D.",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/112070_807_1606_11.webp",
   "a": 1
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "關聯式資料庫（Relational database）中有一個表格 students，每個學生有唯一的一筆學籍資料列（tuple），且每個學生的學號（ID）相異。我們希望設計一個屬性 ID，避免同一個學生有多筆資料的狀況，則我們在定義此表格的屬性 ID 時，必須利用下列那個設定來達到此目的？",
   "o": [
    "主鍵（Primary key）",
    "外部鍵（Foreign key）",
    "不為空值（Not null）",
    "預設值（Default）"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "關於堆疊（Stack）資料結構，下列敘述何者錯誤？",
   "o": [
    "可以使用鏈結串列（Linked list）實作堆疊",
    "堆疊的頂端（Top）總是存放最新插入的元素",
    "堆疊是 FIFO 的資料結構",
    "可以使用陣列（Array）實作堆疊"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "使用 C 語言時，關於陣列（Array）和鏈結串列（Linked List），下列敘述何者錯誤？",
   "o": [
    "陣列的大小在建立時就已經決定了，無法改變；鏈結串列的大小隨著節點的加入或刪除而改變",
    "陣列中的每個元素具有相同的資料型態，鏈結串列中的元素可以有不同的資料型態",
    "陣列支援隨機存取（Random Access），而鍵結串列只能使用循序存取（Sequential Access）",
    "陣列可以處理多維資料，而鏈結串列只能處理一維資料"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "高度為 3 的 AVL 樹（只有一個節點的 AVL 樹高度為 1），總節點數最多為？",
   "o": [
    "3",
    "5",
    "7",
    "8"
   ],
   "a": 2
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "200 個大學同學相約租下一棟大樓做為校外宿舍，並且共同承租寬頻網路。因為整棟大樓只有一個網路孔，負責建置網路的同學必須到 3C 賣場購買網路集線器。在不考慮網路頻寬的前提下，若他們打算採購的集線器有 7 個網路孔，要購買多少個集線器才能讓全部同學皆可同時使用有線網路？",
   "o": [
    "34",
    "35",
    "40",
    "41"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "下列那種樹狀結構，其樹根到每個葉節點的路徑都會一樣長？",
   "o": [
    "AVL 樹（AVL-tree）",
    "二元搜尋樹（Binary Search Tree）",
    "B 樹（B-tree）",
    "四叉樹（Quadtree）"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下圖中的最小生成樹（Minimum Spanning Tree）其邊之總長為何？",
   "o": [
    "25",
    "26",
    "27",
    "28"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下列那個序列是下圖中以 0 為起點的 Depth-first search 順序？",
   "o": [
    "0、1 、2 、3、4、5",
    "0、1 、3 、2、4、5",
    "0、1 、2 、4、3、5",
    "0、1 、3 、5、2、4"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "將資料 23，78，45，8，32，56，依由小至大順序進行排序，在第二回合（Pass）之後資料順序為 23，45，78，8，32，56，最可能用下列那一種演算法？",
   "o": [
    "氣泡排序法（Bubble sort）",
    "選擇排序法（Selection sort）",
    "插入排序法（Insertion sort）",
    "堆積排序法（Heap sort）"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "在一個空的二元搜尋樹（Binary Search Tree）中，依序插入值為 5、4、1、3、2 之節點後，則值為 2之節點到根節點（Root），需經過多少條邊（Edge）？",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "圖示用先廣後深搜尋法（Breadth-First Search）搜尋，當走訪優先權相同時，數字大的先走，走訪結果何者正確？２ ３４ ５ ６ ７",
   "o": [
    "12483657",
    "13786524",
    "12345678",
    "13276548"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "目前 Android 作業系統中，SDK（Software Development Kit）開發環境主要使用的程式語言是：",
   "o": [
    "SWIFT",
    "C#",
    "C ++",
    "Java"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列那個程式語言，並沒有提供以直譯（interpretation）的方式來執行其程式？",
   "o": [
    "C++",
    "JavaScript",
    "Python",
    "Visual Basic"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "在 Java 程式中，欲在某一個類別中宣告一個類別變數（Class variable）時，我們會使用那一個存取修飾詞（Modifier）？",
   "o": [
    "public",
    "protected",
    "private",
    "static"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "如下所示之 C++程式，其輸出為？#include<iostream>#include<string>using namespace std;class P {int ＿＿＿ xx;public:P(int x) : xx(x) {}void show(const std::string& pad = \"\") {cout << \"xx = \" << xx << pad;}};class Q : public P {int yy;public:Q(int x, int y) : P(x) , yy(y) {}void show(const std::string& pad = \"\") {P::show(\", \");cout << \"yy = \" << yy << pad;}};int main(void){Q q(3, 5);q.show(\"\\n\");return 0;}",
   "o": [
    "yy = 5, xx = 3",
    "yy = 3, xx = 5",
    "xx = 5, yy = 3",
    "xx = 3, yy = 5"
   ],
   "a": 3
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "若執行下列 C 語言的程式碼片段，並輸入“1 0”，執行結果為下列何者？int b, a = 3;while (a != 0){printf(\"%d-\", a);scanf(\"%d\", &b);a = b;if (a == 1) break;}",
   "o": [
    "3-",
    "1-0-",
    "3-1-",
    "3-1-0-"
   ],
   "a": 0
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言程式的指令執行時，會產生何種輸出？int a[] = {1, 3, 5, 7};int *p = a, n = sizeof(a)/sizeof(int);printf(\"%d %d\", n, ++*p);",
   "o": [
    "1 2",
    "3 4",
    "4 2",
    "3 1"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式，產生的輸出為下列何者？#include<stdio.h>void ifswap (char p, char q) {char r;r = p;p = q;q = r;printf(\"%c%c-\", p, q);}int main() {char x = 'A', y = 'B';ifswap(x, y);printf(\"%c%c-\", x, y);}",
   "o": [
    "AB-BA-",
    "BA-AB-",
    "BA-BA-",
    "AB-AB-"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言程式執行後，輸出結果為下列何者？#include <stdio.h>void subroutine (){int y = 20;y--;}int main () {int y=30;y--;subroutine ();printf(\"%d\", y );}",
   "o": [
    "19",
    "28",
    "29",
    "30"
   ],
   "a": 2
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "在 C 語言程式裡面宣告 int *A[10]，對於此一宣告的敘述，下列何者正確？",
   "o": [
    "此宣告一個 10 筆整數的陣列，第一筆整數為 A[0]",
    "陣列兩個相鄰元素 A[i], A[i+1]之數值一定差 4",
    "此宣告一個 10 個元素的陣列，其陣列起始位址為 A",
    "此宣告一個 10 個元素的陣列，其陣列結束位址為&A"
   ],
   "a": 2
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "給定以下類別定義：class A{friend class B;private:int data;public:A() { data=0 ; ＿＿＿ }void fa() { data=100 ; }};class B{ private:int data;public:B() { data=400 ; }void fb(A v){data=200 ;v.data=300;v.fa();cout << v.data << endl;cout << data << endl;}};若在 main()中執行以下指令，則將產生的輸出為何？A v1;B v2;v2.fb(v1);",
   "o": [
    "100 200",
    "100 400",
    "300 200",
    "300 400"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "有關行動電話通訊網路，下列敘述何者正確？",
   "o": [
    "第三代行動通訊（3G）採用 GPRS（General Packet Radio Service），下載的速度可達 1.3 Mbps",
    "各種不同的行動通訊技術如 3G、4G、5G 其最大差異在傳輸距離不同",
    "第四代行動通訊（4G）如 LTE（Long-Term Evolution），是由 3GPP 組織所制定",
    "第五代行動通訊（5G）可提供高速度（High Speed）以及高可靠度（Ultra-reliable）的傳輸，但仍有延遲（Latency）較高的問題"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "有關電子商務實務，不包含下列何層面？",
   "o": [
    "資訊流，如訂單資訊",
    "物流，如貨品運送到買家",
    "金流，如消費金額轉移到賣家銀行帳戶",
    "串流，如將分散的、斷續的網路服務變成連續的"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "關於第三方支付，下列敘述何者錯誤？",
   "o": [
    "由具有公信力的機構來充當買賣雙方之間的第三方交易平台",
    "買方撥款到第三方交易平台後，平台通知賣方出貨",
    "買方收到貨品，確認沒問題後通知第三方交易平台實際付款給賣方",
    "Apple Pay 與 Google Pay 這兩種支付方式屬於第三方支付"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "對於 TCP 通訊埠號（Port Number）的敘述，下列何者錯誤？",
   "o": [
    "HTTPS 常用埠號為 443",
    "網路服務伺服器的通訊埠號通常固定，編號一般在 1023 以前，但也有號碼較大者",
    "客戶端（Client）也需要通訊埠號進行與伺服器連接，其編號限於 1024~49151 之間，也設定為固定值，以方便連接",
    "服務伺服器所常用的通訊埠號只是慣例，並非強制性"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "網址上需有通訊埠（Port）的描述，是屬於下列何層的網址？",
   "o": [
    "實體層",
    "資料鏈結層",
    "網路層",
    "傳輸層"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "悠遊卡不需要電池，只有天線接收到讀寫裝置足夠強的訊號時，才會被驅動起來運作，使用下列何種技術？",
   "o": [
    "低功率藍牙（Bluetooth Low Energy, BLE）",
    "主動式 RFID",
    "被動式 RFID",
    "NB-IoT"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "有關 TLS（Transport Layer Security）敘述，下列何者正確？",
   "o": [
    "為抵擋對網頁進行 SQL 注入（SQL Injection）攻擊所設計",
    "為減緩 DDoS（Distributed Denial-of-Service）攻擊所開發之技術",
    "能夠避免網站受到病毒的入侵",
    "避免客戶端與網站主機連線所傳送敏感資料，被有心人士偷窺或竄改"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "關於網路記錄（Cookies）的敘述，下列何者錯誤？",
   "o": [
    "儲存在用戶端上的資料",
    "為一種病毒的名稱",
    "內容可能有使用者名，電腦名，曾經存取的網站等",
    "記錄使用者瀏覽器的資訊"
   ],
   "a": 1
  }
 ]
};

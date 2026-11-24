/* 111 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-111-1-raib006'] = {
 "id": "rai-111-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 111,
 "nth": 1,
 "code": "111070",
 "subj": "raib006",
 "title": "111 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "各項處理器設計策略，下列何者不是 RISC（Reduced Instruction Set Computer）的設計方針？",
   "o": [
    "透過編譯器的指令排程（instruction scheduling）以提升管線式（pipeline）架構的運算效能",
    "讓每個算術運算指令皆可讀寫記憶體運算元，以提升運算效能並降低指令數量",
    "算術運算指令僅可使用暫存器運算元，並透過編譯器的暫存器配置（register allocation）提升運算效率",
    "讓每道指令皆有相同的指令長度，以便於設計超純量（superscalar）處理器架構"
   ],
   "a": 1
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "以存取速度（從快至慢）排列下列記憶體︰快取記憶體（Cache Memory）、主記憶體（Main Memory）、暫存器（Register）：",
   "o": [
    "快取記憶體、主記憶體、暫存器",
    "快取記憶體、暫存器、主記憶體",
    "暫存器、快取記憶體、主記憶體",
    "暫存器、主記憶體、快取記憶體"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "64 位元有號整數（Signed integer）的 2 的補數（2’s complement）表示法中，所能表示的最大整數和最小整數為何？",
   "o": [
    "最大整數為 263，最小整數為-263+1",
    "最大整數為 263-1，最小整數為-263",
    "最大整數為 263-1，最小整數為-263+1",
    "最大整數為 263，最小整數為-263-1"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 系統中，當某 process 執行 fork 系統呼叫（system call）時，下列屬性何者不會複製到 childprocess 中？",
   "o": [
    "virtual memory 的內容",
    "process control block 的內容",
    "process ID",
    "user ID"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "若一個字組由兩個位元組（bytes）所組成，則每一字組可以描述多少種狀態？",
   "o": [
    "16",
    "64",
    "256",
    "65536"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "數值-128 採 2 的補數表示法並以 1 個 byte 來表示，則應表示為：",
   "o": [
    "10000000",
    "10000001",
    "11111111",
    "無法表示（溢位）"
   ],
   "a": 0
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "若一布林（Boolean）代數式 XY＋YZ＋X'Z＋YZ'，可化簡為下列何者？",
   "o": [
    "XY＋X'Z",
    "XY＋YZ",
    "Y＋X'Z",
    "Z＋X'Z"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列何者數值最大？",
   "o": [
    "二進位數 1011100.101",
    "八進位數 132.6",
    "十進位數 92.7",
    "十六進位數 5C.B"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者為 HTML 實現超鏈結時，所使用之標籤？",
   "o": [
    "<a>",
    "<button>",
    "<html>",
    "<ul>"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "CPU 在處理下列那一項工作時，不需要做系統呼叫（system call）？",
   "o": [
    "CPU 執行的程式要新建一個資料檔",
    "CPU 執行的程式要讀取使用者空間中的一筆資料",
    "CPU 執行的程式要求使用者從鍵盤輸入一筆資料，當作某變數的值",
    "CPU 執行的程式要求動態記憶體配置（dynamic memory allocation）"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "假設要對聲音訊號做編碼，取樣頻率（sampling rate）設為 3000 Hz，每個取樣點（sample）的值會被量化成 1024 個階層（即取樣點的最小值為 0、最大值為 1023），則編碼一段長度為 5 秒的聲音訊號需要多少位元？",
   "o": [
    "30000 bits",
    "150000 bits",
    "3072000 bits",
    "15360000 bits"
   ],
   "a": 1
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列何者並非網際網路應用層常用協定？",
   "o": [
    "FTP",
    "HTML",
    "SMTP",
    "HTTP"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列何項工作，較適合即時處理的作業方式？",
   "o": [
    "電費繳納通知單",
    "薪資發放作業",
    "年度報表的列印",
    "網路訂票作業"
   ],
   "a": 3
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "已知在使用二分搜尋法（Binary Search）對排序過的 n 個數字陣列（Array）做搜尋時，前 4 次比對之陣列數值依序為 18.5, 12.5, 7.5, 3.5。從以上結果推導，在 1 至 20 之整數範圍中，有多少個數字不可能為搜尋值？",
   "o": [
    "2",
    "8",
    "13",
    "17"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列那一個結構，具有後進先出（Last In, First Out）的特色？",
   "o": [
    "堆疊（Stack）",
    "佇列（Queue）",
    "最大堆積（Max Heap）",
    "二元搜尋樹（Binary Search Tree）"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "此運算式樹（Expression tree）前置式（Prefix）數學式，應為下列何者？",
   "o": [
    "+a/*bc+de",
    "a+b*c/（d+e）",
    "abc*de+/+",
    "a+/*bc+de"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "若樹的高度為葉子（Leaf）節點到根（Root）節點最長路徑之長度加 1（即，只有一個節點的樹其高度為 1），則高度為 4 的二元樹中，最多有幾個節點？",
   "o": [
    "4",
    "8",
    "15",
    "16"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列何者為一個 n 個點二元搜尋樹（Binary search tree），使用後序走訪（Post-order traversal）在最差情況下（Worst case）之時間複雜度？",
   "o": [
    "O(n)",
    "O(n log n)",
    "O(n2)",
    "O(log n)"
   ],
   "a": 0
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "在一 n 個節點的連通無向圖（Connected Undirected Graph）中，找出一展開樹（Spanning Tree），則此展開樹中有幾個邊（edge）？",
   "o": [
    "n-1",
    "n",
    "n 或 n+1",
    "n-1 或 n"
   ],
   "a": 0
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者是下圖的展開樹（Spanning Tree）？A. B. C. D.",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/111070_805_1505_20.webp",
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "將運算式子(a+b)*d+e/(f+a*d)+c 轉換為後序（Postfix）運算式子：",
   "o": [
    "abdefadc+*+/+*+",
    "ab+d*+e/f+a*d+c",
    "cefad*+/+ab+d*+",
    "ab+d*efad*+/+c+"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "在長度為 n 的串列中進行循序搜尋法，則成功的搜尋（Successful search）平均要做多少次的鍵值比較（Key comparisons）？",
   "o": [
    "n/2",
    "(n–1)/2",
    "(n+1)/2",
    "log n，（log 以 2 為底）"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "關於下列 C 語言中的有號短整數之處理，將產生何種輸出？short s = 32768;printf(\"%hd %hd\", s, ~s);",
   "o": [
    "－32768 32768",
    "32768 32767",
    "－32768 32767",
    "32767 32768"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言的程式產生的輸出為何？int a[6]={1, 3, 5, 2, 4, 6},*p=a, *q=a+5,temp;while (p < q){temp = *p;*p++ = *q;*q-- = temp;}for (p=a; p < a+5; p++)printf(\"%d \", *p);",
   "o": [
    "123456",
    "654321",
    "642531",
    "246135"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "相較於組合語言，下列何者不是一般高階程式語言常見的優點？",
   "o": [
    "可讀性高",
    "具可攜性",
    "較易於維護",
    "執行效率大幅度改善"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "以下迴圈指令for (int i = 1; ++i < 10; i += 2)printf(\"%d \", i);執行後的輸出為何？",
   "o": [
    "2 5 8",
    "2 4 6 8",
    "1 3 5 7 9",
    "1 4 7"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言的程式，輸出結果為何？#include <stdio.h>int main(void) {int x = 0;char s = ‘b’;switch (s) {case ‘a’: x += 1;case ‘b’: x += 2;case ‘c’: x += 3;default: x += 2;}printf(\"%d\", x);return 0;}",
   "o": [
    "0",
    "2",
    "4",
    "7"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "假設我們現在以動態作用域法則（dynamic scope rule）來決定每個變數對應到那一個宣告。下列以 C語言撰寫的虛擬程式碼，程式執行後的輸出為何？#include<stdio.h>void second(){printf(“%d”, y);}void first() {int y=3;second();}int main() {int y=10;first ();}",
   "o": [
    "3",
    "10",
    "13",
    "沒有固定的輸出"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言的函式，若執行 f(4,6)之呼叫，將會產生什麼輸出？int f(int a,int b){if (a%b)return f(b,a%b);elsereturn b;}",
   "o": [
    "0",
    "2",
    "4",
    "6"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 語言所撰寫程式的執行結果，應為何者？#include<stdio.h>int A(int n){n = n+1;return n+1;}int main(){printf(\"%d\\n\", A(10));return 0;}",
   "o": [
    "2",
    "10",
    "11",
    "12"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列 C++程式其執行結果為何？class gcd {private:int a;int b;int result;public:gcd(int x, int y){ a = x; b = y; };void compute(){while (1){if (a > b) {a = a - b;if (a == 0) {result = b;return;}}else {b = b - a;if (b == 0) {result = a;return;}}}}};int main(){gcd AA(48, 16);AA.compute();printf(\"greatest common divisor=%d\\n\", AA.result);}",
   "o": [
    "16",
    "18",
    "20",
    "無法列印，編譯過程有問題"
   ],
   "a": 3
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何者是 C 程式語言，所具有的性質之一？",
   "o": [
    "過載函數（Overloading function）",
    "靜態變數（Static variable）",
    "建構子（Constructor）",
    "this 指標（this pointer）"
   ],
   "a": 1
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "整合實體通路和網路通路，透過網路行銷來引導消費者到實體通路，這種模式稱為：",
   "o": [
    "B2B",
    "C2C",
    "O2O",
    "P2P"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "IP 分享器支援何種功能，可以使得私有 IP 位址（Private IP）轉換為公共 IP 位址（Public IP）？",
   "o": [
    "NAT",
    "DHCP",
    "FTP",
    "TFTP"
   ],
   "a": 0
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列何者非為路由器（Router）的特色及功能？",
   "o": [
    "連結多個網路，具有轉送 IP 封包的能力",
    "由於從發送端到目的端的傳輸路徑很多，路由器可計算最佳之路徑",
    "可以轉換實體位址（Physical Address 或 MAC Address）與 IP 位址，以達到正確傳輸",
    "屬於網路層（Network Layer）的設備"
   ],
   "a": 2
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "某網際網路服務提供者（ISP），出現 10 M/2M 的文句，這 10 M/2M 指的是：",
   "o": [
    "傳輸速度為 2～10 Mbps 間",
    "可提供 10 Mbps 的訊息流量，其中 2 Mbps 免費",
    "傳輸壓縮比為 10：2",
    "下載速度 10 Mbps，上傳速度 2 Mbps"
   ],
   "a": 3
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "當你打開瀏覽器時，主要使用下列何者協定？",
   "o": [
    "HTTP",
    "HTML",
    "ARP",
    "ICMP"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "分級網路定址法（Classful Internet Addressing）依據網路的大小以及用途的不同，將其分為 Class A ~ Class E五種不同的網路，如果有一 IP 位址為 168.95.42.86，在分級上該位址屬於下列何者？",
   "o": [
    "Class A",
    "Class B",
    "Class C",
    "Class D"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "勒索軟體，又稱勒索病毒，是一種特殊的惡意軟體，其被歸類為：",
   "o": [
    "比特幣（Bitcoin）",
    "釣魚（Phishing）",
    "阻斷存取式攻擊（Denial-of-access attack）",
    "阻斷服務式攻擊（Denial-of-service attack）"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列何者非防範網路釣魚（Phishing）的方法？",
   "o": [
    "留意連結的網址是否與預期的相同",
    "關閉郵件自動開啟以及預覽功能",
    "使用 PGP 認證發信者的身分",
    "留意網頁內容是否與預期的相同"
   ],
   "a": 3
  }
 ]
};

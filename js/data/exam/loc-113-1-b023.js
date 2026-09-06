/* 113 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-113-1-b023'] = {
 "id": "loc-113-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 113,
 "nth": 1,
 "code": "113200",
 "subj": "b023",
 "title": "113 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "一般而言，處理器利用下列那一個元件，記錄下一個要抓取的指令的記憶體位址？",
   "o": [
    "指令暫存器（instruction register）",
    "程式計數器（program counter）",
    "堆疊指位器（stack pointer）",
    "指令解碼器（instruction decoder）"
   ],
   "a": 1
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "為提高運算效能，超純量（superscalar）處理器通常採用亂序（out-of-order）及預測式執行（speculativeexecution）的方式執行指令。然而，當指令發生例外（exception）狀況或遇到中斷（interrupt）時，可能必須刪除某些已預先執行指令的結果，使處理器的狀態倒回某循序指令結束時的狀態，做到 preciseinterrupt。下列超純量處理器中的微架構機制，何者是用於實現 precise interrupt 的必要機制？",
   "o": [
    "instruction dispatcher",
    "reservation window",
    "reorder buffer",
    "branch target buffer"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "假設某一塊記憶體的大小為 32MB（Mega Byte），該記憶體的每個字組（word）大小為 8-Byte，則CPU 至少要有多少條位址線，才足夠定址該記憶體的一個字組？",
   "o": [
    "19",
    "20",
    "22",
    "25"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "十進位數 183 以二進位表示時，其數字為下列何者？",
   "o": [
    "10100111",
    "10101111",
    "10110111",
    "10111111"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "電腦 CPU 中的 ALU 單元，下列何者為主要功能？",
   "o": [
    "資料暫存",
    "執行運算",
    "執行控制作業",
    "執行中斷程式"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "假設你只有 1-to-4 解多工器（demultiplexer）的元件可以使用，則總共需要幾個 1-to-4 解多工器元件，才能組合成一個 1-to-64 解多工器？",
   "o": [
    "12",
    "16",
    "20",
    "21"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "將下列三進位數值(210010)3 轉換為九進位，何者正確？",
   "o": [
    "(602)9",
    "(513)9",
    "(703)9",
    "(233)9"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "若作業系統沒有做好程序排程（process scheduling），使得某些程序 P1、P2、P3 不斷地獲得使用 CPU的機會，但某一程序 P4 卻長時間無法使用 CPU，這種現象稱為：",
   "o": [
    "捱餓（starvation）",
    "死結（deadlock）",
    "循環等待（circular waiting）",
    "資源佔據（resource holding）"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是使用虛擬記憶體的主要好處？",
   "o": [
    "程式不再受到實際記憶體之可用空間的限制",
    "加快記憶體存取的速度",
    "同一時間內可以執行更多的程式",
    "可縮短程式開始執行的時間"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "假設某一張彩色影像的解析度為 800 × 600，每個像素的顏色採用「索引顏色（indexed color）」（也可稱為「調色盤顏色 palette color」）來編碼，假設使用的調色盤顏色設定為 32 色，則編碼此張彩色影像需要多少位元？",
   "o": [
    "2400000 bits",
    "7200000 bits",
    "15360000 bits",
    "46080000 bits"
   ],
   "a": 0
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列何種記憶體的處理速度最快？",
   "o": [
    "隨機記憶體（RAM）",
    "唯讀記憶體（ROM）",
    "快取記憶體（CACHE）",
    "暫存器（REGISTER）"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "某個關聯式資料庫中，原本已有二個關聯（relation）表 A 和 B，若想產生一個新的關聯表 C，包含同時存在於關聯表 A 和關聯表 B 中的元組（tuples），則該使用下列那一個關聯運算？",
   "o": [
    "select",
    "intersection",
    "project",
    "union"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列何者是目前常見的資料庫管理軟體？",
   "o": [
    "Word",
    "PowerPoint",
    "MySQL",
    "Clubhouse"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列為 C 語言中宣告的一個陣列 a[10]，何者為此矩陣第一個元素的記憶體位置？",
   "o": [
    "a[0]",
    "&a",
    "a",
    "a[1]"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "若在一個堆疊（Stack）中，依序推入（Push）5, 8, 20, 1, -5 和 20 等數字，接著執行兩次的彈出（Pop），則堆疊頂端的元素，應為何者？",
   "o": [
    "20",
    "-5",
    "1",
    "8"
   ],
   "a": 2
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下圖中從節點 a 至節點 h 的最短路徑，其長度為何？",
   "o": [
    "11",
    "12",
    "13",
    "14"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "有一棵二元樹之前序（Prefix）走訪結果為 B、A、D、C、E、H、F、G，若此二元樹根節點之右子樹的樹根為 E，則此二元樹根節點之左子樹的節點個數為何？",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列何種樹狀資料結構，不保證為平衡樹（Balanced tree）？",
   "o": [
    "完整二元樹（Complete binary tree）",
    "完滿二元樹（Full binary tree）",
    "二元搜尋樹（Binary search tree）",
    "最小堆積（Min heap）"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "何者不是下圖的子圖（Subgraph）？A. B. C. D. 33 4 22 2 24 11 3 44 1",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/113200_440_2110_19.webp",
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "若以廣度優先搜尋（Breadth-first Search）走訪下圖（從節點 1 開始），各節點的走訪順序應為何？（若同時有多個選擇，請優先挑選數字較大的節點）",
   "o": [
    "123456",
    "143265",
    "146523",
    "146532"
   ],
   "a": 1
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下列 C 函式為實作何種排序法？void sort(long list[], long n){long c, d, t;for (c = 0 ; c < ( n - 1 ); c++){for (d = 0 ; d < n - c - 1; d++){if (list[d] > list[d+1]){t = list[d];list[d] = list[d+1];list[d+1] = t;}}}}",
   "o": [
    "合併排序（Merge sort）",
    "快速排序（Quick sort）",
    "堆積排序（Heap sort）",
    "氣泡排序（Bubble sort）"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "關於利用循序搜尋法（Sequential Search）尋找串列資料的應用時機，下列敘述何者正確？",
   "o": [
    "被搜尋的串列元素已經排序好",
    "被搜尋的串列含有大量的元素",
    "經常需要頻繁搜尋串列的元素",
    "串列的元素未排序且只需少量次數的搜尋"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "以 C 語言撰寫的程式片段如下，執行的結果為何？int a=8;a=a>>2;printf(\"a=%d\\n\", a);",
   "o": [
    "a=8",
    "a=6",
    "a=4",
    "a=2"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列 C 指令的輸出為何？short s = 32768/2;printf(\"%hd %hd\", s<<1, s<<2);",
   "o": [
    "-32768 0",
    "32768 65536",
    "65536 32768",
    "32768 0"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "在程式語言的發展過程中，最早被設計出來的高階程式語言福傳（FORTRAN），隸屬於下列那一種類別？",
   "o": [
    "命令式（imperative）程式語言",
    "物件導向式（object-oriented）程式語言",
    "函數式（functional）程式語言",
    "邏輯式（logic）程式語言"
   ],
   "a": 0
  },
  {
   "n": 26,
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
   "fig": "img/q/113200_440_2110_26.webp"
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "考慮下列 C 語言程式的宣告union allType {char character;int integer;float real;double doubleNum;};如果 sizeof(char) 是 1, sizeof(int) 是 4, sizeof(float) 是 4, sizeof(double) 是 8, sizeof(allType) 是多少？",
   "o": [
    "8",
    "16",
    "17",
    "20"
   ],
   "a": 0
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++ 程式碼後，螢幕印出的數字為何？int f(int x){if(x%2==0) return 2*x;return x+1;}int main( ) {cout<< f(f(f(2)+f(3))) <<endl;return 0;}",
   "o": [
    "21",
    "24",
    "27",
    "32"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++ 程式碼後，螢幕印出的數字為何？int f(int m){static int n=0;n++;return (m+n);}int main( ) {cout << f(f(f(3))) << endl;return 0;}",
   "o": [
    "7",
    "8",
    "9",
    "10"
   ],
   "a": 2
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "C 函數 bar()的執行，產生下列何輸出結果？void bar(void) {int i, j;for ( i = 0 ; i < 5 ; i++ ) {for ( j = 0 ; j < i+1 ; j ++) printf(\"*\");printf(\" \");}}",
   "o": [
    "***** ***** ***** ***** *****",
    "***** **** *** ** *",
    "* ** *** **** *****",
    "* ** *** ** *"
   ],
   "a": 2
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "給定以下類別定義：class A{public:f() { cout << \"$$$\"; }A() { cout << \":::\" ; }A(int a) { cout << \"***\" ; }private:};若在 main()中執行以下指令，則將產生的輸出為何？A *p=new A;A v(1);v.f();p->f();",
   "o": [
    "$$$$$$",
    ":::***$$$$$$",
    "***$$$",
    ":::***$$$"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++ 程式碼後，螢幕印出的數字為何？int main( ) {int A[3][4]={2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24};int *p1=A[1];int *p2;p2=p1+4;cout<< *p2 <<endl;return 0;}",
   "o": [
    "14",
    "16",
    "18",
    "20"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "關於乙太網路（Ethernet）的敘述，下列何者錯誤？",
   "o": [
    "以 MAC 位址來彼此傳遞訊息",
    "乙太網路可以架在傳輸層上",
    "為區域網路的一種",
    "以引導式媒介傳輸訊息"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "網路通訊設備交換器（Switch）是屬於 OSI 網路協定第幾層？",
   "o": [
    "實體層",
    "資料連結層",
    "網路層",
    "傳輸層"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "有關光纖通訊（Fiber-optic communication），下列何者可為其軸心材質及傳輸原理？",
   "o": [
    "玻璃纖維、光折射",
    "玻璃纖維、光全反射",
    "矽、光折射",
    "矽、光全反射"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "對於 IP 位址（IPv4）的敘述，下列何者錯誤？",
   "o": [
    "主機位址全為 1 代表廣播",
    "Class A 的 IP 為 127 開頭（127.x.y.z）者，其為 Loopback（本機回送）的位址",
    "IP 位址 168.92.3.190 表示為 Class C 的 IP 群組",
    "Class A, Class B, Class C 為三個不同等級的 IP 群組，其中 Class C 代表小型網路，其每個網路位址中的主機位址數量較 Class A 及 Class B 少"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "有關 OSI 模型中傳輸層（Transport Layer）的協定，下列何者正確？",
   "o": [
    "TCP 的協定具有偵測及處理壅塞（Congestion）的設計",
    "UDP 協定透過三方交握（Three-way Handshaking）的方式確保連線",
    "傳輸層中的 TCP 與 UDP 皆能提供可靠（Reliability）傳輸，當發現有錯誤發生時，會進行重新傳送",
    "FTP、SSH、DNS、PING、HTTP 等協定皆採用 TCP 傳輸模式"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "有關 RSA 加密系統的敘述，下列何者錯誤？",
   "o": [
    "為一種公開金鑰加密系統（Public Key Cryptosystem）",
    "主要基於大數的因數分解（Factorization）的數學難題所建構的加密系統",
    "發明者為 Diffie 及 Hellman 兩人，為一種金鑰交換（Key Exchange）的演算法",
    "為了防止被破解，其公開金鑰長度需要很長，目前要在 2048 位元以上"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "有關 UDP（User Datagram Protocol）的敘述，下列何者錯誤？",
   "o": [
    "UDP 是屬於傳輸層（Transport layer）的協定",
    "UDP 採用多工（Multiplexing）與解多工（Demultiplexing）方式",
    "UDP 為非連接式協定（Connectionless protocol）",
    "UDP 的缺點是較複雜且速度慢"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "垃圾信件主要因為下列何種協定，很容易捏造不實身分來濫發電子郵件？",
   "o": [
    "SMTP",
    "SNMP",
    "DNS",
    "IP"
   ],
   "a": 0
  }
 ]
};

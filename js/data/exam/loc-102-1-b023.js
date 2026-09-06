/* 102 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-102-1-b023'] = {
 "id": "loc-102-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 102,
 "nth": 1,
 "code": "102190",
 "subj": "b023",
 "title": "102 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "下列有關 CPU 中斷（interrupt）的敘述，何者正確？",
   "o": [
    "當某周邊 I/O 設備需要 CPU 服務時，CPU 可對此 I/O 設備發出中斷訊號，然後執行相對應的 I/O 服務程式",
    "中斷發生時，CPU 會將旗標（flag）狀態值存入一佇列（queue）中",
    "通常透過 interrupt vector 可以對應到中斷服務程式（interrupt service routine）的起始位址",
    "中斷 A 發生後 CPU 去執行中斷 A 之服務程式時，若剛好又發生另一個中斷 B，CPU 不允許在中斷 A 的服務程式未結束前，就先跳去執行中斷 B 的服務程式"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列何者為視訊檔的格式？",
   "o": [
    "MP3",
    "WAV",
    "AVI",
    "WMA"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "以下何者是最早支援物件導向的程式語言？",
   "o": [
    "C#",
    "Pascal",
    "C++",
    "Smalltalk"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "6 顆一模一樣的硬碟構成 RAID（redundant array of inexpensive disks）磁碟陣列，下列那一種磁碟陣列組態的寫入效能最好？",
   "o": [
    "RAID 0",
    "RAID 5",
    "RAID 6",
    "RAID 2"
   ],
   "a": 0
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "計算機系統中，快取記憶體（cache）的功能為何？",
   "o": [
    "加大記憶體容量",
    "加大程式可定址的空間大小",
    "加快處理器的時脈（clock）",
    "加快資料存取的速度"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下列關於頁置換（page replacement）的敘述何者錯誤？",
   "o": [
    "最久未被使用（least-recently-used）演算法的效能一般優於先進先出（first-in, first-out）演算法",
    "有時候增加記憶體的容量反而會造成更多的頁錯失（page fault）",
    "在實務上，最佳分頁置換演算法（optimal page replacement）是最多作業系統採行的演算法",
    "最佳分頁置換法（optimal page replacement）的效能絕對不低於最久未被使用演算法的效能"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於循序邏輯（sequential logic）電路？",
   "o": [
    "subtractor",
    "multiplexer",
    "register",
    "encoder"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "在分時（time-sharing）作業系統中，如果程序（process）A 進行資料的輸出／輸入，則該程序將進入何種狀態？",
   "o": [
    "waiting state",
    "ready state",
    "terminated state",
    "running state"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "將十進位數值 147 以五進位表示，應為下列何者？",
   "o": [
    "1042",
    "1321",
    "0132",
    "0013"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "設以 G 表示一非多重圖形（multigraph）、無自身邊線（self edge）之無向圖形（undirected graph）結構，並以 |V| 表示 G 之節點（vertex）數，以 |E| 表示 G 之邊線（edge）數。若 G 為連結圖形（connected graph），則下列選項中有關 G 之敘述何者正確？",
   "o": [
    "G 中最長之簡單路徑（simple path）其長度（length）為 |E|",
    "|V| ≤ |E| ≤ (|V|(|V|-1)/2)",
    "G 中至少有一節點其分支度（degree）是 (|V|-1)",
    "G 僅有一連結元件（connected component）"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "關於堆疊（stack）與佇列（queue）的實作方法，下列敘述何者錯誤？",
   "o": [
    "堆疊可以用陣列（array）或是鏈結串列（linked list）來實作",
    "佇列可以用陣列（array）或是鏈結串列（linked list）來實作",
    "無論用何者來實作堆疊，實作時都是可以使用一個指標來協助堆疊裡元素的加入與刪除",
    "無論用何者來實作佇列，實作時都是可以使用一個指標來協助佇列裡元素的加入與刪除"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列何者為資料傳輸速度的單位？",
   "o": [
    "dpi",
    "dB",
    "bps",
    "mips"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "Java Virtual Machine（JVM）是一種直譯器（interpreter），可以執行 JAVA bytecodes。下列何者是 JVM 的最主要特色？",
   "o": [
    "讓使用者撰寫 JAVA 程式時不必在意系統平台的差異",
    "讓使用者很容易撰寫功能複雜的 JAVA 程式",
    "讓使用者可以很方便地偵測出程式中的邏輯錯誤",
    "讓 JAVA 程式的執行速度加快"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列何者為十六進位數(24)16 與十六進位數(26)16 相加的結果？",
   "o": [
    "(50)16",
    "(74)16",
    "(4A)16",
    "(4B)16"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "自 n 筆資料中依據指定之鍵值（key value）尋找資料稱為資料搜尋（searching）或簡稱搜尋；若尋獲該指定鍵值之資料，則稱為資料搜尋成功；若未尋獲該指定鍵值之資料，則稱為資料搜尋失敗。下列為資料搜尋相關之敘述：①使用二分搜尋（binary search）法搜尋資料必須將資料依據鍵值排序（sort），並以鏈結串列（linked list）儲存②使用二分搜尋法搜尋資料結果成功之時間複雜度（time complexity）為 O(log2n)③使用二分搜尋法搜尋資料結果失敗之時間複雜度為 O(n)④將資料儲存為二元樹（binary tree）結構進行資料搜尋結果成功之時間複雜度為 O(log2n)⑤將資料儲存為二元樹結構進行資料搜尋結果失敗之時間複雜度為 O(n)請由下列選項中選出最適合者：",
   "o": [
    "②⑤正確；①④錯誤",
    "①②正確；③⑤錯誤",
    "②④正確",
    "④⑤錯誤"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列何者不為 OSI 架構中之傳輸層（transport layer）的功能？",
   "o": [
    "兩台主機之間傳輸資料",
    "確保封包發送與接收的順序相同",
    "封包遺失重送",
    "字碼轉換"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是防毒軟體？",
   "o": [
    "Avira AntiVir",
    "趨勢科技 PC-Cillin",
    "Microsoft Office",
    "Norton Anti-virus"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "在物件導向程式語言中，將資料及操作此資料之方法包裝成一個物件的概念稱之為：",
   "o": [
    "抽象化（abstraction）",
    "多型（polymorphism）",
    "繼承（inheritance）",
    "封裝（encapsulation）"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "在網際網路設備中，具有識別節點實體位址能力，而能將收到的封包快速轉送到目的節點者稱之為何？",
   "o": [
    "橋接器（bridge）",
    "集線器（hub）",
    "交換器（switch）",
    "訊號增益器（repeater）"
   ],
   "a": 2
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列有關無線隨意（ad-hoc）網路的敘述，何者正確？",
   "o": [
    "又稱 infrastructure network",
    "網路中每台電腦需透過 AP（Access Point）傳遞資料",
    "通常沒有固定路徑（fixed route）",
    "多採用 PCF（Point Coordination Function）的傳輸機制"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "在電腦網路連結中，下列何種功能措施可用以避免瞬間大量的資料湧入接收端，使得接收端負荷不了，造成資料遺失？",
   "o": [
    "壅塞管制（congestion control）",
    "流量管制（flow control）",
    "錯誤管制（error control）",
    "繞徑管制（routing control）"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列何者為資訊所有者必須具備的專業倫理？",
   "o": [
    "做好電信傳輸安全措施",
    "勿干預資訊使用人之活動",
    "注意資訊內容之合法性",
    "創造合乎道德約束的資訊"
   ],
   "a": 2,
   "alt": [
    3
   ]
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "延伸標記語言（Extensible Markup Language, XML）的主要目的為下列何者？",
   "o": [
    "描述資料",
    "播放聲音",
    "播放影片",
    "邏輯運算"
   ],
   "a": 0
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "關於資訊安全的維護，下列何種性質，其所指的是資訊及相關的資訊資產，在授權人需要的時候是否可以立即獲得？",
   "o": [
    "保密性（confidentiality）",
    "完整性（integrity）",
    "責任性（accountability）",
    "可用性（availability）"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言的宣告，屬於何種型態？enum days {Mon, Tue, Wed, Thu, Fri, Sat, Sun};",
   "o": [
    "列舉型態（enumerated type）",
    "陣列型態（array type）",
    "結構型態（structure type）",
    "串列型態（list type）"
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
   "fig": "img/q/102190_438_2213_26.webp"
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "層疊樣式表 Cascading Style Sheets（CSS）的主要功能為何？",
   "o": [
    "描述一種硬體規格",
    "設計網頁外觀及格式",
    "存取資料庫內容",
    "邏輯運算"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "有關網路安全攻擊的敘述，下列何者錯誤？",
   "o": [
    "攻擊模式分為主動攻擊（active attacks）和被動攻擊（passive attacks）",
    "偽裝攻擊（masquerade）是屬於主動攻擊的一種手法",
    "修改訊息內容（modification of message content）是一種被動攻擊手法",
    "防範被動攻擊的方法之一，是將訊息加密或隱藏後再傳輸"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "以下何種資料結構常用於描述後進先出（last in, first out）的資料序列？",
   "o": [
    "堆疊（stack）",
    "佇列（queue）",
    "二元樹（binary tree）",
    "雜湊表（hash table）⎢n⎥"
   ],
   "a": 0
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "已知一個由 n 個節點（node）組成的單向串列（singly linked list）以及第一個節點的位置，則取得第 ⎢ ⎥ 個⎣2⎦節點需花費的時間為：",
   "o": [
    "θ(l)",
    "θ(n)",
    "θ(n2)",
    "θ(log n)"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列為關於快速排序法（quick sort）的敘述，何者正確？①在最差情況下（worst case）的時間複雜度為 O(n )②在最差情況下（worst case）的時間複雜度為 O(n log n)③在最佳情況下（best case）的時間複雜度為 O(n log n)④基準值（pivot）的選擇與時間複雜度無關⑤使用分而治之（divide and conquer）法則",
   "o": [
    "①③④",
    "①③⑤",
    "②⑤",
    "②③④"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "有關超純量（superscalar）CPU 的設計，何者錯誤？",
   "o": [
    "CPU 內有多個功能單元（functional units）或一個 CPU 的機器週期內可處理多個運算的功能單元",
    "通常可於一個 CPU 的機器週期擷取多道指令來執行",
    "可以提升 CPU 每一機器週期內執行指令的數目",
    "Superscalar CPU 不能加入 pipeline 的設計"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "數學中的複數（complex number）以 a + bi（ i = − 1 ）的形式表示，且 a 與 b 為實數（real number）。使用 C 語言設計程式時，若變數 x 將儲存一複數，則下列選項中何者最適合用於宣告 x 的資料型態？",
   "o": [
    "double",
    "enum",
    "struct",
    "union"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "在程式執行時，程序呼叫所產生的啟動記錄（activation record）中，記錄的資訊包含下列何者？",
   "o": [
    "程式作者",
    "程式的長度",
    "程序的啟動時間",
    "程序的傳入參數"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列何者並非電腦外接螢幕常用的傳輸線規格？",
   "o": [
    "HDMI",
    "DVI",
    "PCI-E",
    "D-Sub"
   ],
   "a": 2
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "有兩個布林函數（Boolean functions），其中F1(X, Y, Z) = XY' +（甲）+ X'Y，F2(X, Y, Z) = XY' +（乙）+ X'Y若 F1(X, Y, Z)恆等於 F2(X, Y, Z)，且（甲）不等於（乙），則下列何者錯誤？",
   "o": [
    "（甲）= Y'Z （乙）= X'Z",
    "（甲）= YZ （乙）= XZ",
    "（甲）= YZ' （乙）= X'Z",
    "（甲）= Y'Z' （乙）= X'Z'"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "在 Microsoft Windows 的檔案系統中，下列何者是正確的檔案路徑表示法？",
   "o": [
    "/user1/test/hw1.doc",
    "D:\\test\\hw1.doc",
    "user1->test->hw1.doc",
    "D:test:hw1.doc"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "給定數列[20, 0, 9, 7, 3, 10, 13, 15, 8, 12]，以氣泡排序法（bubble sort）來排序需要九個回合，下列何者為氣泡排序法執行過三個回合（three passes）後的結果？",
   "o": [
    "[0, 9, 20, 7, 3, 10, 13, 15, 8, 12]",
    "[0, 3, 7, 9, 10, 8, 12, 13, 15, 20]",
    "[0, 7, 3, 9, 10, 13, 8, 12, 15, 20]",
    "[0, 9, 20, 7, 3, 10, 13, 15, 12, 8]"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "下述遞迴函式的功能為何？int f(int n){return (n<=0) ? 0 : (n*n+f(n-1));}",
   "o": [
    "若 n > 0，則 f(n) = 1 + 4 + 9 + 16 + …. + n*n；否則 f(n) = 0",
    "若 n > 0，則 f(n) = 0 + 2 + 4 + 6 + …. + 2*n；否則 f(n) = 0",
    "若 n > 0，則 f(n) = 1 + 2 + 3 + 4 + …. + n；否則 f(n) = 0",
    "若 n > 0，則 f(n) = n!；否則 f(n) = 1"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 語言撰寫的程式，執行後產生的輸出為何？#include <stdio.h>main(){ int m1 =49, m2=5;do { m1 /= m2++; } while(m1);printf(“%d\\n”, m2);}",
   "o": [
    "7",
    "8",
    "本程式編譯時，編譯器（Compiler）發生錯誤訊息，不能執行而無輸出結果產生",
    "本程式執行時，發生錯誤，故無輸出結果產生"
   ],
   "a": 1
  }
 ]
};

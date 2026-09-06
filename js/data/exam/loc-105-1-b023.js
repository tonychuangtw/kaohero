/* 105 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-105-1-b023'] = {
 "id": "loc-105-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 105,
 "nth": 1,
 "code": "105180",
 "subj": "b023",
 "title": "105 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "下圖電路的功能以布林函數（Boolean Function）描述，何者正確？AB ＿＿＿ 0MUXSC",
   "o": [
    "S = A B + AB C",
    "S = AB",
    "S = BC",
    "S = ABC + A"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "假設 CPU 之處理速度為 500 MIPS（million instructions per second），管線（pipeline）處理的情況下執行一個指令平均花費 4 個時脈週期（clock cycle），則此 CPU 之工作頻率最低為何？",
   "o": [
    "125 MHz",
    "500 MHz",
    "2 GHz",
    "4 GHz"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列那一項 TCP/IP 的服務，可以將主機名稱轉換成 IP 位址，反之亦然？",
   "o": [
    "HTTPS",
    "DNS",
    "SMTP",
    "POP3"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "關於多媒體資料型態之敘述，下列何者正確？",
   "o": [
    "視訊的壓縮方法屬於失真的壓縮方法，因為它主要採用變動長度法",
    "影像的壓縮方法屬於失真的壓縮方法，因為它主要採用字典參照編碼（dictionary-based encoding）",
    "動態影像壓縮標準（Motion Picture Experts Group；MPEG）第三層，使用知覺的編碼（perceptual encoding）技術",
    "動態影像壓縮標準（Motion Picture Experts Group；MPEG）的最新版本是第七版，專門用來壓縮高畫質電視廣播的訊號"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "關於現代作業系統所提供的功能之敘述，下列何者錯誤？",
   "o": [
    "要能將其他程式載入記憶體後執行，並提供其他程式所需的協助",
    "要負責記憶體的分配，以免記憶體不夠系統或程式使用",
    "要能將循序執行的工作轉換為平行執行，充分利用多核心處理器",
    "當軟體和硬體的資源使用發生衝突時，要能居間協調解決"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下列何種方式無法減少程式在處理器執行過程中，各種 hazard 所造成的暫停（stall）的效果？",
   "o": [
    "減少處理器內部管線化（pipeline）的級數",
    "採用資料前傳（Data Forwarding）的技術",
    "利用編譯器（Compiler）對於程式指令做適當的排程",
    "減少暫存器檔案（register file）的大小"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "小王買了一顆時脈頻率為 4 GHz 的四核心微處理器，請問其內部時脈每振盪一次所花費的時間約為多少奈秒（ns）？",
   "o": [
    "2.50 ns",
    "1.60 ns",
    "1.00 ns",
    "0.25 ns"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列那一個 RAID（Redundant Arrays of Inexpensive Disks）級別（level）是採用鏡射（mirroring）的方法？",
   "o": [
    "RAID 0",
    "RAID 1",
    "RAID 2",
    "RAID 3"
   ],
   "a": 1
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "在 SQL 查詢句中，資料列的選擇條件主要寫在下列那一個子句？",
   "o": [
    "SELECT 子句",
    "FROM 子句",
    "WHERE 子句",
    "GROUP 子句"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列有關點陣圖（Bitmap image）與向量圖（Vector image）的比較，何者最正確？",
   "o": [
    "向量圖形格式較點陣圖形格式適合製作漫畫圖",
    "JPEG 是一種向量圖形資料格式",
    "在呈現簡單的圖像時，點陣圖所需的儲存空間通常比向量圖小",
    "相較於點陣圖，向量圖在放大後，通常比較容易產生鋸齒狀的邊"
   ],
   "a": 0
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "如果針對以下的有向權重圖（directed weighted graph），我們希望利用鄰接矩陣（adjacency matrix）來表示該圖的原始（也就是非經過任何處理的）資料，則下列 C 語言的宣告何者是合理的？10 72 9 36 7",
   "o": [
    "int graph[8];",
    "int graph[9];",
    "int graph[4] [4];",
    "int graph[5] [5];"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "假設我們針對以下數列進行由小到大的排序：[16, 10, 8, 20]，而我們採用的演算法為選擇排序（selectionsort），則第一次執行的數字交換和所形成的數列為下列何者？",
   "o": [
    "交換 10 和 8，得到數列[16, 8, 10, 20]",
    "交換 16 和 8，得到數列[8, 10, 16, 20]",
    "交換 16 和 10，得到數列[10, 16, 8, 20]",
    "交換 20 和 8，得到數列[16, 10, 20, 8]"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "對兩個空的佇列（Queue）每次擇一依序加入（Enqueue）1、2、3、4、5、6 六個元素，並任意穿插提取（Dequeue）動作，則下列何種提取次序不可能發生（下列提取次序均為由左至右）？",
   "o": [
    "241365",
    "145263",
    "246153",
    "314265"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "假設圖(a)中的二元樹，其每一個節點以圖(b)中的 C 語言結構實作。若我們呼叫圖(c)中的 unknown 程式並傳人圖(a)中的根節點，則列印出來的字串為下列何者？void unknown(struct node *p)z ＿＿＿ struct node ＿＿＿ { ＿＿＿ if (p != NULL){ ＿＿＿ char data; ＿＿＿ { ＿＿＿ unknown(p->left);struct node *left; ＿＿＿ printf(\"%c\",p->data);x ＿＿＿ y ＿＿＿ struct node *right; ＿＿＿ unknown(p->right);}; ＿＿＿ }(b) ＿＿＿ }(a)(c)",
   "o": [
    "xyz",
    "zxy",
    "yzx",
    "xzy"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列何種資料結構，實現遞迴函數最為有效？",
   "o": [
    "佇列",
    "堆疊",
    "鍵結串列",
    "樹"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列何者為在最差情況下（worst case），於一個一般性的二元搜尋樹（binary search tree）上做搜尋、插入、刪除動作的時間複雜度？",
   "o": [
    "搜尋為 O(log n)，刪除和插入為 O(n)",
    "三者皆為 O(log n)",
    "三者皆為 O(n)",
    "搜尋和插入為 O(log n)，刪除為 O(n)"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "平衡樹（Balanced tree）指的是左子樹與右子樹的何種特性相近？",
   "o": [
    "高度",
    "節點個數",
    "寬度",
    "葉節點個數"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "對一個有 12 個節點的二元搜尋樹（Binary Search Tree）作後序訪問（Postorder Traversal），並依序輸出訪問節點的數值，其結果如下（次序由左至右）：3, 4, 6, 5, 8, 15, 19, 18, 16, 12, 24, 20。在此樹中兩個節點之間的路徑（Path）最多含有多少個邊（Edge）？",
   "o": [
    "6",
    "7",
    "8",
    "9"
   ],
   "a": 1
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "使用合併排序法（Merge Sort）對 n 個數字排序，在最佳情況（best case）及最糟情況（worst case）下，其時間複雜度（time complexity）為何？",
   "o": [
    "最佳情況：Θ(n)，最糟情況：Θ(n log n)",
    "最佳情況：Θ(n log n)，最糟情況：Θ(n log n)",
    "最佳情況：Θ(n)，最糟情況：Θ(n2)",
    "最佳情況：Θ(n log n)，最糟情況：Θ(n2)"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "關於時間複雜度的敘述，下列何者錯誤？",
   "o": [
    "線性搜尋法（linear search）在最差情況下（worst case）之時間複雜度為 O(n)",
    "氣泡排序（bubble sort）之時間複雜度為 O(n2)",
    "二分搜尋法（binary search）在最差情況下（worst case）之時間複雜度為 O(n)",
    "二分搜尋法（binary search）在最佳情況下（best case）之時間複雜度為 O(l)"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "程式中每當一個副程式（subroutine）被呼叫時，系統會為該副程式建立一個啟動紀錄（activation record）以儲存相關資訊。請問一般我們會利用下列何種資料結構來儲存啟動紀錄，以方便副程式的呼叫、返回，並有效率地使用記憶體空間？",
   "o": [
    "堆積（heap）",
    "堆疊（stack）",
    "陣列（array）",
    "集合（set）"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "有關於 C++語言，在程式裡宣告 int &A=B;，則下列敘述何者正確？",
   "o": [
    "將 A 的位址指定給 B 變數",
    "若依序執行 A=3; B=4; C=A+B; 之後變數 C 的結果為 7",
    "A, B 其實為同一個位址的變數",
    "A, B 為兩個不同變數，但 B 的數值會複製給 A"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言函式 sort 採用的是何種排序方法？int A[100];n = 100;void sort () {int i, j, t;for( i=1; i<n; i++) {for(j=0; j<n-i; j++) {if(A[j]>A[j+1]) {t = A[j];A[j] = A[j+1];A[j+1] = t;}}}}",
   "o": [
    "選擇排序法（selection sort）",
    "氣泡排序法（bubble sort）",
    "快速排序法（quick sort）",
    "合併排序法（merge sort）"
   ],
   "a": 1
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "若在 C 程式中出現下列宣告：int a[10],*p=a;則下列何者編譯時會出現型態不符之訊息？",
   "o": [
    "printf(\"%d\",p==a[0]);",
    "printf(\"%d\",p==&a[0]);",
    "printf(\"%d\",*p==a[0]);",
    "printf(\"%d\",p[0]==a[0]);"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "一個陣列（array）有 n 個空間，分配給兩個堆疊（stacks）使用。請問每個堆疊最多能夠使用陣列的多少空間？",
   "o": [
    "⎣n / 2⎦",
    "⎣n / 2⎦ + 1",
    "⎣n / 2⎦ − 1",
    "n"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列那個位址屬於網際網路 IPv4 下的私有位址（private address）？",
   "o": [
    "10.0.0.12",
    "192.123.23.34",
    "163.13.200.97",
    "74.23.45.66"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "關於 Java 程式語言的敘述，下列何者錯誤？",
   "o": [
    "為 UNIX 的主要實作語言",
    "變數名字大小寫不同，temp 與 TEMP 為不同變數",
    "為一種物件導向程式語言（object-oriented programming language）",
    "位元碼（Byte Code）需要在 Java 虛擬機器（Java Virtual Machine，簡稱 JVM）上才可執行"
   ],
   "a": 0
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "一般來說，在 C 語言中型態 unsigned short 變數值的範圍為 0 至 65535。試問下列 C 程式片段，產生的輸出為何？unsigned short a = 65534;printf(\"%d \", a);a = a + 1;printf(\"%d \", a);a = a + 2;printf(\"%d\", a);",
   "o": [
    "65534 65535 1",
    "65534 65534 65534",
    "65534 65535 65537",
    "65534 -32768 -32766"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int A[4] [3]={1,2,3,4,5,6,7,8,9,10,11,12};int(*pp)[3]=&A[3];int *p;p=*(pp-2)+2;cout<< *p <<endl;retum 0;}",
   "o": [
    "4",
    "5",
    "6",
    "7"
   ],
   "a": 2
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列何者不為物件導向程式語言（object-oriented programming language）的主要特性？",
   "o": [
    "遞迴（recursive）",
    "繼承（inheritance）",
    "封裝（encapsulation）",
    "抽象資料型態（abstract data types）"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "HTML（HyperText Markup Language）提供許多標籤（tags）以便排版網頁。下列那項功能 HTML 並不提供？",
   "o": [
    "直接連接資料庫伺服器取出資料",
    "插入圖片",
    "將文字加底線",
    "建立選項讓使用者點選"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何種協定只應用於區域網路之內，是一種將上一層的 IP 位址轉換成實體位址（MAC）的協定？",
   "o": [
    "MAP",
    "ARP",
    "ICMP",
    "IP"
   ],
   "a": 1
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列敘述何者不屬於實體安全（physical security）所涵蓋範圍？",
   "o": [
    "對自然天災所可能產生之威脅與防範",
    "對人為入侵所可能產生之威脅與防範",
    "對人為侵權所可能產生之威脅與防範",
    "對火災所可能產生之威脅與防範"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列何者以無線電波進行短距離訊息傳送，擁有低功率、低成本的特性？",
   "o": [
    "3G",
    "藍芽",
    "Wi-Fi",
    "光纖"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列那一項最符合密碼學雜湊函數（hash function）的主要功能之一？",
   "o": [
    "資料完整性",
    "資料機密性",
    "資料可用性",
    "資料普遍性"
   ],
   "a": 0
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "在目前網際網路使用的協定中，“利用 MAC 位址表示來源與目的終端設備位置”是屬於下列何層的工作？",
   "o": [
    "實體層（physical layer）",
    "傳輸層（transport layer）",
    "連結層（link layer）",
    "網路層（network layer）"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "傳輸層（transport layer）在 ISO 提出的 OSI（Open System Interconnection）七層模型中屬於第四層，下列何者不是傳輸層的主要功能？",
   "o": [
    "路由（routing），尋找到達目的地的路徑",
    "編定序號（sequence number），替每一個傳輸單位編號",
    "流量控制（flow control）",
    "可靠性與效率性（reliability and efficiency）"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "如果 IP 位址為 196.110.12.123 且設定的子網路遮罩為 255.255.255.0，其所對應的子網路位址為何？",
   "o": [
    "196.0.0.0",
    "196.255.255.255",
    "196.110.12.0",
    "196.110.12.255"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "一反向器（Inverter）邏輯閘之輸出入訊號特性如下圖所示，其中 VIH = 2.5 伏特、VIL = 1.2 伏特、VOH = 4.5伏特、VOL = 0.4 伏特。則當該等輸出訊號用於該等輸入時，其低狀態雜訊容忍度（Low-state Noise Margin）為何？ Vdd VddVOHVIHVILVOL0 0(a)輸入電壓範圍 (b)輸出電壓範圍",
   "o": [
    "2.0 伏特",
    "1.3 伏特",
    "3.3 伏特",
    "0.8 伏特"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "一記憶體由列解碼器（row decoder），行解碼器（column decoder）與 RAM cells 所組成如圖所示，其中A3、A2、A1、A0 為記憶體位址位元，試問下列敘述何者正確？列解碼器2-to-4Decoder ＿＿＿ 0A3 ＿＿＿ 21RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell0 ＿＿＿ 1 ＿＿＿ 2 ＿＿＿ 3A2 ＿＿＿ 2 ＿＿＿ 1Row ＿＿＿ RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cellselect ＿＿＿ 4 ＿＿＿ 5 ＿＿＿ 6 ＿＿＿ 7RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell8 ＿＿＿ 9 ＿＿＿ 10 ＿＿＿ 11RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell ＿＿＿ RAM cell12 ＿＿＿ 13 ＿＿＿ 14 ＿＿＿ 15Read/Write ＿＿＿ Read/Write ＿＿＿ Read/Write ＿＿＿ Read/Writelogic ＿＿＿ logic ＿＿＿ logic ＿＿＿ logicData in ＿＿＿ Data in ＿＿＿ Data in ＿＿＿ Data inData out ＿＿＿ Data out ＿＿＿ Data out ＿＿＿ Data outRead/ Bit ＿＿＿ Read/ Bit ＿＿＿ Read/ Bit ＿＿＿ Read/ ＿＿＿ BitWrite select ＿＿＿ Write select ＿＿＿ Write select Write ＿＿＿ selectData inputRead/Write行解碼器0 ＿＿＿ 1 ＿＿＿ 2 ＿＿＿ 3 ＿＿＿ DataColumn ＿＿＿ 2-to-4 Decoder ＿＿＿ outputdecoder ＿＿＿ with enable21 ＿＿＿ 20 ＿＿＿ EnableA1 A0Chip select",
   "o": [
    "使用 4×4 RAM Cell Array 達成 16×l RAM 的運作",
    "使用 4×4 RAM Cell Array 達成 8×2 RAM 的運作",
    "使用 4×4 RAM Cell Array 達成 4×4 RAM 的運作",
    "使用 4×4 RAM Cell Array 達成 l×16 RAM 的運作"
   ],
   "a": 0
  }
 ]
};

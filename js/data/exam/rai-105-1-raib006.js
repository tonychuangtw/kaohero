/* 105 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-105-1-raib006'] = {
 "id": "rai-105-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 105,
 "nth": 1,
 "code": "105070",
 "subj": "raib006",
 "title": "105 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "相較於二維動畫，下列何者不是三維動畫的優點？",
   "o": [
    "繪製時電腦的運算速度較快",
    "立體效果較好",
    "容易切換角度",
    "物理模擬的技術有較好的發揮空間"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列何者為資料庫設定定期檢查點（checkpoint）的執行目的？",
   "o": [
    "確保交易日誌（transaction log）內容一定正確",
    "避免突然停電造成尚未寫回硬碟的資料流失",
    "加強資料庫安全（security）的維護",
    "減少執行資料回復（recovery）時所需的時間"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "資料表 T 有屬性 A 和 B，下列 SQL 語法中，Select T.AFrom TWhere T.B > 0Select 可對應關聯式代數（relational algebra）的 a 運算，Where 對應關聯式代數的 b 運算。下列選項何者正確？",
   "o": [
    "a = s, b = p",
    "a = p, b = s",
    "a = s, b = ⋈",
    "a = ⋈ , b = s"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "無號二進位算術 (0001 1100) + (1011 0010) 其結果為何？",
   "o": [
    "1010 1110",
    "1100 1110",
    "1001 0110",
    "1100 1100"
   ],
   "a": 1
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "將十六進位數字 306D 化成八進位數字，下列何者正確？",
   "o": [
    "12397",
    "30155",
    "30134",
    "25554"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "將資料儲存於某既定大小的快取記憶體中可有直接對映（direct mapped）、集合關聯式（set associative）與完全關聯式（fully associative）等三種方式。若依照其發生 conflict misses 的機會由大到小排列，則一般而言順序為下列何者？",
   "o": [
    "Fully associative、set associative、direct mapped",
    "Set associative、direct mapped、fully associative",
    "Set associative、fully associative、direct mapped",
    "Direct mapped、set associative、fully associative"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "假設電腦 A 和電腦 B 的指令集結構（instruction set architectures）相同，電腦 A 的時脈週期時間（clockcycle time）為 250 ps，每個指令平均所需時脈週期（CPI）為 2；電腦 B 的時脈週期時間為 500 ps，每個指令平均所需時脈週期為 1.4。試問何者執行速度較快？其執行速度為另一部電腦的幾倍？",
   "o": [
    "電腦 A 較快，1.4 倍",
    "電腦 B 較快，1.2 倍",
    "電腦 A 較快，1.2 倍",
    "電腦 B 較快，1.4 倍"
   ],
   "a": 0
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "為提高 CPU 的效能，下列何種技術可以達到讓 CPU 同時執行數個指令的效果？請選出所有正確者：①直接記憶體存取（direct memory access） ②超純量（superscalar） ③快取記憶體（cache memory）④管線化（pipelining）",
   "o": [
    "①③",
    "①②③",
    "②④",
    "②③④"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者為揮發性記憶體（volatile memory）？",
   "o": [
    "磁碟（magnetic disk）",
    "隨機存取記憶體（random access memory）",
    "快閃記憶體（flash memory）",
    "光碟（optical disc）"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下圖為一個全以 NAND 閘所構成的電路。若將該電路的功能以 sum-of-products 形式的布林函數（Boolean function）描述，則下列何者正確？ABSC",
   "o": [
    "S = ABC",
    "S = A + BC",
    "S = AB + BC",
    "S = AB + BC"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "邏輯式 x + yz = ( x + y )( x + z ) 是根據什麼學理？",
   "o": [
    "分配律",
    "結合律",
    "迪摩根（DeMorgan）定理",
    "交換律"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在系統中假設有 n 個程序 P0、P1、…Pn。如果 P0 所需的資源（resource）被 P1 所持有、P1 所需的資源被 P2 所持有、…、Pn 所需的資源被 P0 所持有。則這些程序因而可能發生下列那一種情形？",
   "o": [
    "I/O interrupt",
    "Page fault",
    "Context switching",
    "Deadlock"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 的檔案系統中，下列何者是錯誤的檔案路徑表示法？",
   "o": [
    "test/hwl.pdf",
    "D:/test/hwl.pdf",
    "/root/test/hwl.pdf",
    "../test/hwl.pdf"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "假設系統使用最佳分頁置換演算法（optimal page replacement algorithm），且有 3 個分頁框（frame）分配給程序（process）A 使用。若剛開始 3 個分頁框皆為空的，請問程序 A 作一連串分頁存取：7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1 會使 page 2 被置換出（swap out）分頁框幾次？",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 1
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "考慮以陣列（array）實作完滿二元樹（full binary tree），例如下方右圖的陣列（array）儲存左圖的完滿二元樹資料，此二元樹有 3 個階層（level），節點上的數字為陣列的索引值，索引值由 1 開始。則下列敘述何者錯誤？A2 3 1 2 3 4 5 6 7B CA B C D E F G4 5 6 7D E F G",
   "o": [
    "若二元樹有 12 個階層，則陣列至少要可以儲存 4096 個節點",
    "在陣列上，若一節點的索引值為 1027，其父節點的索引值為 513",
    "在陣列上，若一節點的索引值為 612，其左邊子節點的索引值為 1224",
    "在陣列上，若一節點的索引值為 396，其右邊子節點的索引值為 793"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列是一個環型佇列（circular queue）加入元素的函式：template <class KeyType>void Queue<KeyType>::Enqueue(const KeyType& x){// line (1)// line (2)else queue[rear = rear2] = x;}此函式執行數步之後，得到下圖的執行結果：A61 A5A4idx = 0A3A2 A1idx = n-1n-2 n-3圖中 n 為佇列的大小，idx 為陣列的索引，此時佇列共有 6 個元素 A1, A2, …, A6，front = n-4，rear = 2。請在 line(l)與 line(2)選擇下列最適合的敘述句，完成這個函式：",
   "o": [
    "line (1): int rear2 = rear % MaxQueueSize;line (2): if (front == rear2) QueueFull();",
    "line (1): int rear2 = (rear + 1) % MaxQueueSize;line (2): if (front == rear2) QueueFull();",
    "line (1): int rear2 = rear % MaxQueueSize;line (2): if (front == (rear2 + 1) % MaxSize) QueueFull();",
    "line (1): int rear2 = (rear + 1) % MaxQueueSize;line (2): if (front == (rear2 + 1) % MaxSize) QueueFull();"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "如下圖所示之最小堆積（min-heap），若此時進行擷取最小鍵值（extract-min），則在動作完成後，對於關鍵值為 7 之節點，其父（parent）節點之關鍵值為何？3 68 5 7",
   "o": [
    "3",
    "5",
    "6",
    "8"
   ],
   "a": 1
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "包含 n 個元素的二元搜尋樹（binary search tree）其最高與最低的可能高度各為多少？",
   "o": [
    "最高為 O(n log n) ，最低為 O(n)",
    "最高為 O(n) ，最低為 O( log n)",
    "最高與最低均為 O( log n)",
    "最高與最低均為 O(n)"
   ],
   "a": 1
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "令圖中邊上的數字即為邊之長度。利用 Prim 演算法尋找下圖之最小生成樹（minimum spanning tree）時，若起始頂點（starting vertex）為節點 f，則第 4 條被加入最小生成樹的邊，其長度為何？ea13 17 1914 c d f11 16b 12 g",
   "o": [
    "11",
    "13",
    "15",
    "17"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "關於廣度優先（breadth-first）與深度優先（depth-first）搜尋的敘述，下列何者正確？",
   "o": [
    "廣度優先與深度優先搜尋的時間複雜度相等",
    "廣度優先搜尋需要堆疊（stack）的輔助",
    "廣度優先搜尋適合以遞迴的方式來完成",
    "深度優先搜尋可以找到從某節點出發到另一節點的最短路徑"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "已知 data 是一個長度為 n 的整數陣列（integer array）。下列程式採用的是何種排序演算法（sortingalgorithm）？int i, j, pos, temp;for(i=0;i<n-l;i++){pos=i;for(j=i+1;j<n;j++){if(data[j]<data[pos]){pos = j;}}if(pos !=i){temp = data[i];data[i] = data[pos];data[pos] = temp;}}",
   "o": [
    "氣泡排序法（bubble sort）",
    "合併排序法（merge sort）",
    "快速排序法（quick sort）",
    "選擇排序法（selection sort）"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "在最佳情況（best case）下使用二元搜尋法（binary search）搜尋排序好的 n 個數字時，最少需比對幾次？",
   "o": [
    "1",
    "log n",
    "n",
    "n2"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "有關以下 C 語言撰寫之程式，下列敘述何者正確？#include <stdio.h>#include <iostream>int *FM(int *p, int n){int i, *m;m = p;for (i=0; i < n; i++)if (*(p + i)< *m)m = p + i;return m;}main(){int a[5], *m, i;for (i=0; i<5; i++){scanf(\"%d\", &a[i]);}m = FM(a, 5);printf(\"%d, %d\\n\", i, *m);system(\"PAUSE\");}",
   "o": [
    "執行後若輸入 63 21 34 47 52 則輸出 5, 63 並跳行",
    "執行後若輸入 63 21 34 47 52 則輸出 5, 21 並跳行",
    "執行後若輸入 63 21 34 47 52 則輸出 5, 47 並跳行",
    "編譯後顯示錯誤訊息"
   ],
   "a": 1
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "已知 C 程式如下，下列敘述何者正確？#include <stdio.h>#include <iostream>int *FM(int *p, int n){int i, *m;m = p;for (i=0; i < n; i++)if (*(p + i)> *m)m = p + i;return m;}main(){int *m, i;int a[]={2, 8, 5, 6, 4};m = FM(a, 5);printf(\"%d\\n\", *m);system(\"PAUSE\");}",
   "o": [
    "自定函數 FM()的功用是找出最小值",
    "自定函數 FM()中的 if 指令無法比較大小",
    "自定函數 FM()回傳的是一個地址",
    "主程式 main()中的 printf()無法輸出"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式片段執行完畢時，迴圈中的 X = X + Y 指令會被執行幾次？X=0;Y = 10 ;While (Y>0) {X = X+Y ;Y = Y+1 ;}",
   "o": [
    "9 次",
    "10 次",
    "11 次",
    "至少 12 次"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "有關執行下列兩個 C 語言程式片段的結果，何者正確？程式片段 Pl 程式片段 P2int nl=0, n2=10, n3=0; int nl=0, n2=10, n3=0;for( nl=0; nl<n2; nl++) { for( nl=0; nl<n2; nl++) {n3 = nl * n2; n3 += n2;} }printf(\"%d\\n\", n3); printf(\"%d\\n\", n3);",
   "o": [
    "程式片段 Pl 和程式片段 P2 的輸出相同",
    "程式片段 Pl 的輸出為 100",
    "程式片段 P2 的輸出為 100",
    "程式片段 P2 的輸出為 45"
   ],
   "a": 2
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "有關以下 C 語言撰寫之程式，下列敘述何者正確？#include <stdio.h>#include <iostream>main(){int i=4, a, b, c, d;a=i++;b=++i;c=i--;d=--i;printf(\"%d, %d, %d, %d\", a, b, c, d);system(\"PAUSE\");}",
   "o": [
    "執行後輸出 5, 6, 5, 4",
    "執行後輸出 4, 6, 6, 4",
    "執行後輸出 5, 5, 6, 4",
    "執行後輸出 4, 6, 5, 4"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "已知 C 程式如下，下列敘述何者正確？#include <stdio.h>#include <iostream>main(){int a=2; int c=0;while (a<15){a=a+2;c=c+1;}printf(\"%d\", c);system(\"PAUSE\");}",
   "o": [
    "執行後輸出 6",
    "執行後輸出 7",
    "執行後輸出 13",
    "編譯時顯示錯誤訊息"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "執行下列 Java 程式後，產生的輸出為何？class A {public int method1(int a, int b) { return a+b; }}class B extends A {public int method1(int a, int b) { return a-b; }}public class Test {public static void main(String args[]) {A a = new A();B b = new B();System.out.println(a.method1(2,3)/b.method1(0, 1));}}",
   "o": [
    "5",
    "2",
    "1",
    "-5"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "在 C++或 Java 程式語言中，用 new 運算子（operator）除了會配置（allocate）物件的動態記憶體區塊外，還會產生什麼動作？",
   "o": [
    "當離開該物件的可視範圍（scope）時自動釋放該記憶體區塊",
    "當離開該物件且該物件不再被使用時自動釋放該記憶體區塊",
    "呼叫該物件所屬類別（class）的建構子（constructor）",
    "呼叫該物件所屬類別（class）的解構子（destructor）"
   ],
   "a": 2
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列何者不為 OSI 架構中的資料鏈結層（Data link layer）的功能？",
   "o": [
    "連線路徑選擇",
    "確保實體連線之資料正確性",
    "以 MAC 子層連接實體層",
    "以 LLC 子層連接網路層"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列那個網路通訊設備會將其所連接的電腦組成單一個碰撞網域（collision domain）？",
   "o": [
    "集線器（hub）",
    "交換器（switch）",
    "路由器（router）",
    "閘道器（gateway）"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "對於錯誤偵測（error detection）與錯誤更正（error correction）的敘述，下列何者錯誤？",
   "o": [
    "可使用 checksum 來進行錯誤偵測",
    "可使用 cyclic redundancy check 來進行錯誤偵測",
    "可使用 Hamming code 來進行錯誤偵測與更正",
    "可使用 Huffman code 來進行錯誤偵測與更正"
   ],
   "a": 3
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列有關無線網路傳輸的敘述何者錯誤？",
   "o": [
    "紅外線、雷射都可以使用於無線傳輸",
    "可使用光線繞射的特性達成無線傳輸的目的",
    "藍芽（bluetooth）亦適合於超過 500 公尺以上的無線傳輸",
    "近場通訊（NFC; near-field communication）是一種短距離的高頻無線通訊技術"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列對 TCP 的敘述何者錯誤？",
   "o": [
    "TCP 具有 broadcast 的功能，可以用來實作 service discovery 的功能",
    "TCP 會重傳遺失的封包",
    "TCP 具有 flow control 機制，當接收端來不及處理封包時，可以通知發送端降低送出封包的速度",
    "TCP 具有 congestion control 機制，可以在網路壅塞時紓緩壅塞的現象"
   ],
   "a": 0
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "使用瀏覽器（browser）下載遊戲程式（game program）時，該遊戲程式應歸類為那種文件（document）類型？",
   "o": [
    "靜態文件（static document）",
    "動態文件（dynamic document）",
    "主動式文件（active document）",
    "彈性文件（flexible document）"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "在網路拓樸的型態中，若是存在唯一的控制節點與其他節點連接，且其他節點間並不直接相連，此種拓樸稱之為：",
   "o": [
    "匯流排網路",
    "星狀網路",
    "環狀網路",
    "樹狀網路"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列有關資訊安全的敘述何者錯誤？",
   "o": [
    "資訊安全攻擊事件可造成組織的重大損失",
    "系統感染病毒並傳染擴散，能使整個系統癱瘓",
    "購置最先進的資訊安全設備即可解決資訊安全問題",
    "大量使用資訊技術時可能產生的不當行為，可以藉由修改法律來規範"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "有關阻斷服務（denial of service, DoS）攻擊，下列敘述何者錯誤？",
   "o": [
    "阻斷服務攻擊是一種被動攻擊（passive attacks）手法",
    "阻斷服務攻擊，以阻斷或減緩網路設備之正常運作為目的",
    "TCP SYN Flood 攻擊是一種阻斷服務攻擊方法",
    "UDP Flood 攻擊是一種阻斷服務攻擊方法"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "若在瀏覽器的網址欄中輸入 www.edu.tw 要觀看該網頁時，下列敘述何者錯誤？",
   "o": [
    "若該使用者的電腦不曉得 www.edu.tw 對應的 IP address，則會透過 DNS 服務取得之",
    "該使用者的電腦會和 www.edu.tw 所屬的電腦建立 TCP 連線",
    "該使用者的電腦會利用 HTTP 協定向 www.edu.tw 所屬的電腦取得該網頁的內容",
    "HTTP 協定需要兩條連線，一條傳送 control message，另一條傳送資料"
   ],
   "a": 3
  }
 ]
};

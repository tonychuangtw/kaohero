/* 110 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-110-1-raib006'] = {
 "id": "rai-110-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 110,
 "nth": 1,
 "code": "110070",
 "subj": "raib006",
 "title": "110 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "32 位元電腦中，若記憶體分頁大小為 2048 位元組，該系統最多可支援幾個記憶體分頁？",
   "o": [
    "2^32",
    "2^28",
    "2^22",
    "2^21"
   ],
   "a": 3
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "某循序程式的執行時間中有 90%是可被平行化（parallelizable）的部分。若欲以多核心（multi-core）處理器取得 2 倍的加速（speedup），至少需要幾個核心？",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列計算機語言，何者可用於合成（synthesis）硬體電路？①C++Ｖ ②Python ③Verilog ④Java ⑤VHDL",
   "o": [
    "②③",
    "③⑤",
    "①②",
    "④⑤"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "將二進制數字 01011010 轉成十進制數字，答案為：",
   "o": [
    "55",
    "74",
    "90",
    "102"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "假設陣列 A 有 n 個整數的元素，讀取（或寫入）陣列 A 的第 i 個元素的值，i≦n，電腦所需要的時間：",
   "o": [
    "與 n 的一次方成正比",
    "與 n 的二次方成正比",
    "常數時間，與 n 的大小無關",
    "與 n 的三次方成正比"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "若全彩圖像中每一個像素（Pixel） ，需以三個位元組（Bytes）來表示，每一個像素的顏色有多少種變化？",
   "o": [
    "3*8種",
    "256 種",
    "3 * 256 種",
    "256 * 256 * 256 種"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言的程式，輸出結果為何？void foo(int n1, int n2) {int temp;temp = n1;n1 = n2;n2 = temp;}int main(void) {int x = 1, y = 2, z = 3;foo(x, y);foo(y, z);printf(“%d, %d, %d”, x, y, z);}",
   "o": [
    "2，3，1",
    "1，2，3",
    "2，1，3",
    "3，2，1"
   ],
   "a": 1
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "有關以遞迴（Recursion）或迴圈（Iteration）設計程式，下列何者錯誤？",
   "o": [
    "所有的遞迴函式都可以轉換為迴圈函式",
    "所有的迴圈函式都可以轉換為遞迴函式",
    "通常遞迴函式執行效率較迴圈函式慢",
    "為了維護函式呼叫的正確順序與次數，遞迴函式執行時需要用到佇列（Queue）資料結構，而迴圈函式則須用到堆疊（Stack）資料結構"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列那一個不是堆疊（Stack）的特性？",
   "o": [
    "後進先出（Last in first out）",
    "常用於程序（Process）記憶體的動態配置",
    "插入資料的動作在頂端（Top）",
    "刪除資料的動作在頂端"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "如果圖中不存在迴路（Cycles） ，那麼在具有 7 個頂點的簡單有向圖（Simple directed graph）中，最多有多少個邊？",
   "o": [
    "12",
    "7",
    "6",
    "14"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "IPv6 協定能提供更多 IP 位址空間，解決 IPv4 數量不足問題，有關 IPv6 的長度為何？",
   "o": [
    "16 bits",
    "32 bits",
    "64 bits",
    "128 bits"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "當同一個瀏覽器，同時開啟兩個 TCP 連線到同一台 Web 伺服器時，伺服器收到的連線訊息中，那一個欄位最有可能不同？",
   "o": [
    "來源埠（Source Port）",
    "來源 IP 位址（Source IP）",
    "目的埠（Destination Port）",
    "目的 IP 位址（Destination IP）"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "某個數位電路設計使用到一個解多工器（demultiplexer） ，該解多工器的選擇控制線共有 6 條，下列敘述何者正確？",
   "o": [
    "該解多工器有 1 個輸入通道、（至多）6 個輸出通道",
    "該解多工器有 1 個輸入通道、（至多）64 個輸出通道",
    "該解多工器有（至多）6 個輸入通道、1 個輸出通道",
    "該解多工器有（至多）64 個輸入通道、1 個輸出通道"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "九進位數值(75)9 以三進位表示，下列何者正確？",
   "o": [
    "(0121)3",
    "(2211)3",
    "(1212)3",
    "(2112)3"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "愈來愈多的消費型相機，採用 CMOS（Complementary metal-oxide semiconductor）感光元件來擷取畫面。相較於 CCD（Charge-coupled device）感光元件，對 CMOS 的敘述，下列何者錯誤？",
   "o": [
    "較常見於智慧型手機上",
    "耗電較低",
    "成本較便宜",
    "最高像素較低"
   ],
   "a": 3
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "作業系統的程序排程器（process scheduler）會管理電腦中每一個程序（process）的狀態。若某一程序 P1 原本在使用 CPU，但遇到需要從鍵盤讀取資料的狀況，則程序 P1 會被改變為何種狀態？",
   "o": [
    "Ready state",
    "Waiting state",
    "Running state",
    "Finished state"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "根據以下的 C++宣告，下列何者不是\"ListB\"類別的私有成員（private member）？class ListA {int first;public: void add(int);};class ListB: private ListA{int second;public: void put(int);};",
   "o": [
    "first",
    "add",
    "second",
    "put"
   ],
   "a": 3
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "執行下列 Python 語言程式碼片段後，產生的輸出為何？a=40y=10if (a <50):if (a < 30):y = y+10else:y = y - 10print(y)",
   "o": [
    "0",
    "10",
    "20",
    "40"
   ],
   "a": 1
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下列何者為 n 個節點的二元搜尋樹（Binary search tree）最糟搜尋時間複雜度？",
   "o": [
    "O(n)",
    "O(log n)",
    "O(n^2)",
    "O(n log n)"
   ],
   "a": 0
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "圖示為一個二元表示樹（expression tree），下列何者為其前序（Preorder）輸出？+* /– A B CD E",
   "o": [
    "+/BC*-DEA",
    "+*-DEABC",
    "+*-DEA/BC",
    "+*A-DE/BC"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "將訊息切割成許多較小封包，封包大小皆固定，且每個封包都知道目的地位址，各自傳送到目的地之後，由目的地電腦將封包重新組合之交換，為何種交換？",
   "o": [
    "訊息交換",
    "分封交換",
    "線路交換",
    "組合交換"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "若 5G 行動通訊，其網速為 1 Gbps，假設傳輸時控制訊號及其他等非資料需要用去 50%網速，傳送 50 MB檔案需時為多少？",
   "o": [
    "0.8 s",
    "0.05 s",
    "0.4 s",
    "0.1 s"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "常見的 TCP 阻斷式攻擊（Denial-of-Service Attack） ＿＿＿ ，主要是利用 TCP 標頭代碼欄位中的下列何種旗標（Flag）？",
   "o": [
    "ACK",
    "URG",
    "SYN",
    "RST"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "一圖（Graph）G 有 n 個節點（Vertices）以及 e 個邊（Edges） ＿＿＿ ，若用相鄰矩陣（Adjacency matrix）A 來表示 G，則 A 中的元素（Elements）應該有幾個？",
   "o": [
    "n",
    "n2",
    "n+e",
    "n*e"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "相較於複雜指令集電腦 CISC（Complex Instruction Set Computer）CPU 而言，精簡指令集電腦 RISC（ReducedInstruction Set Computer）CPU 的特點，不包括下列那一項？",
   "o": [
    "RISC CPU 指令集中的指令個數較少",
    "RISC CPU 的指令格式較少",
    "RISC CPU 的硬體較容易做管線（pipelining）設計",
    "高階語言程式編譯出的 RISC 機器碼（和 CISC 機器碼相比）較節省記憶體空間"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "SYN Flood 是一種針對 TCP 的阻斷服務攻擊，主要利用下列何者以達到影響正常連線的目的？",
   "o": [
    "伺服器端能處理的半開連線（Half-open connection）數量有限",
    "網路頻寬不足",
    "網路卡硬體的速度太慢",
    "TCP 的程式實作有錯誤"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "關於將 n 筆資料進行排序（Sorting），下列敘述何者正確？",
   "o": [
    "快速排序法（Quicksort）的 worst case 時間複雜度是 O(n log n)",
    "插入排序法（Insertion sort）的 best case 時間複雜度是 O(n log n)",
    "合併排序法（Merge sort）的時間複雜度是 O(n log n)",
    "選擇排序法（Selection sort）的時間複雜度是 O(n log n)"
   ],
   "a": 2
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "若要將兩個各自由小到大排序好的數列（長度分別為 5 和 6）進行合併排序（Merge sort），使得合併後的數列也能由小到大排列，則合併過程至少需要進行幾次數字比較？",
   "o": [
    "5",
    "6",
    "10",
    "11"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "考慮下列三種排班演算法︰先到先服務排班法（FCFS）、循環排班法（RR）、最短剩餘時間優先排班法（SRTF），其中有多少種有機會導致飢餓（starvation）問題？",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "依一致性限制，若外來鍵的值不是它所參照的關聯主鍵中的值，則這個外來鍵的值之敘述，下列何者正確？",
   "o": [
    "必須為虛值（Null）",
    "不可以為虛值（Null）",
    "可能為虛值（Null）",
    "可以為任何值"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "如下所示之 C 程式，其輸出為？#include<stdio.h>int cc = 0, xx = 0, yy = 0;int f1(int nn){static int cc = 0;int xx = nn;cc++;}int f2(int nn){static int cc = 0;int yy = nn;xx = nn;cc++;}int main(void){f1(1);f2(2);printf(\"cc = %d, xx = %d, yy = %d\\n\", cc, xx, yy);return 0;}",
   "o": [
    "cc = 0, xx = 2, yy = 0",
    "cc = 2, xx = 0, yy = 0",
    "cc = 1, xx = 0, yy = 2",
    "cc = 1, xx = 1, yy = 2"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言程式執行後，產生的輸出為何？#include <stdio.h>void unknown (){static int x = 10;x = x+10;printf(“%d;”, x);}int main () {unknown();unknown();}",
   "o": [
    "10;10;",
    "10;20;",
    "20;20;",
    "20;30;"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "關於網路設備的敘述，下列何者錯誤？",
   "o": [
    "閘道器（Gateway）是用來轉換兩個不同網路型態間的通訊協定與資料格式",
    "數據機（Modem）是用來做「類比」與「數位」兩者訊號轉換的裝置",
    "中繼器（Repeater）是用來連接多台電腦形成區域網路的裝置",
    "路由器（Router）是根據路由表資訊，安排所接收封包下一個傳送的路徑位置"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "X 是一個 16 位元樣式（Bit pattern） ，若要將 X 的中間 8 個位元強制設定為 0，且讓其他位元保持原有內容，應該進行下列何邏輯運算（Logic Operations）？",
   "o": [
    "X OR 1111000000001111",
    "X AND 1111000000001111",
    "X OR 0000111111110000",
    "X AND 0000111111110000"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "一般而言，密碼可分為對稱式金鑰與非對稱式金鑰，下列何者加密法屬於非對稱式金鑰密碼？",
   "o": [
    "移位密碼或凱薩密碼（Caesar cipher）",
    "RSA 密碼系統（RSA cryptosystem）",
    "多字母密碼（Polyalphabetic cipher）",
    "換位密碼（Transposition cipher）"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "對數列（5, 6, 2, 9, 4）進行選擇排序（Selection sort） ，下列何者為正確步驟？",
   "o": [
    "（5, 6, 2, 9, 4）→（5, 6, 2, 4, 9）→（2, 5, 6, 4, 9）→（2, 4, 5, 6, 9）",
    "（5, 6, 2, 9, 4）→（2, 5, 6, 4, 9）→（2, 4, 5, 6, 9）",
    "（5, 6, 2, 9, 4）→（2, 5, 6, 9, 4）→（2, 4, 5, 6, 9）→（2, 4, 5, 6, 9）→（2, 4, 5, 6, 9）",
    "（5, 6, 2, 9, 4）→（2, 6, 5, 9, 4）→（2, 4, 5, 9, 6）→（2, 4, 5, 9, 6）→（2, 4, 5, 6, 9）"
   ],
   "a": 3
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "若要以二元搜尋（Binary search）從 A, B, C, D, E, F, G, H, I, J, K, L, M, N, O 中尋找 Z，則搜尋過程中檢驗的字母依序為何？",
   "o": [
    "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O",
    "H, L, N, O",
    "O",
    "H, A, O"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是星狀網路拓撲（Star Network Topology）的特性？",
   "o": [
    "效率佳，降低資料傳輸發生衝突（Collision）的機率",
    "新增或移除節點（電腦）時，不會造成網路的中斷",
    "具有支援同儕網路（Peer-to-Peer）傳輸的優點",
    "需要經過集中式的設備，譬如 Hub 的連結"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "假設 a, b, c, d, e, f 是類別 CLS 的六個物件變數（object variables），下列 C++語言程式片段，a, b, c, d, e, f六個物件的建構（construct）順序為何？void foo(void) {CLS a;static CLS b;&frac14;}CLS c;int main(void) {CLS d;static CLS e;if (1){CLS f; &frac14;}foo();&frac14;}",
   "o": [
    "abcdef",
    "defabc",
    "cdefab",
    "bcdefa"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "有關子網路切割，假設子網路遮罩（Subnet Mask）值為 255.255.255.192。若有一台電腦的 IP 為 192.115.2.149，下列那一個位址與該臺電腦在同一個子網路內（網路識別碼（Network ID）相同）？",
   "o": [
    "192.115.2.190",
    "192.115.3.150",
    "192.115.2.193",
    "192.115.2.100"
   ],
   "a": 0
  }
 ]
};

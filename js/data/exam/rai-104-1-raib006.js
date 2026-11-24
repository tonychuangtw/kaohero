/* 104 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-104-1-raib006'] = {
 "id": "rai-104-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 104,
 "nth": 1,
 "code": "104070",
 "subj": "raib006",
 "title": "104 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "相較於點陣圖，下列何者一般而言不是向量圖的主要優點？",
   "o": [
    "檔案較小",
    "縮放過程中產生的失真較小",
    "較適合呈現攝影的照片",
    "較適合用於卡通與動畫"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列多媒體檔案，何者的壓縮過程不會產生失真？",
   "o": [
    "MP3 音樂",
    "PNG 圖片",
    "JPEG 圖片",
    "H.264 影本"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫（relational database）中，如果因表格 A 造成違反第三正規式（Third Normal Form），我們會對表格 A 執行下列何種動作以達成正規化（normalization）？",
   "o": [
    "將表格 A 分割成數個較小的表格",
    "替表格 A 建立索引",
    "將表格 A 中的資料由小到大排序",
    "將表格 A 和其他表格的相關資料合併成一個較大的表格"
   ],
   "a": 0
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列有關資料庫索引（index）的敘述，何者錯誤？",
   "o": [
    "索引是一種特定的檔案形成，並有一定的儲存空間",
    "索引記錄資料庫的資料表中欄位裡的資訊是以何種格式儲存",
    "索引不會因為資料更新而有更動的需要",
    "索引的目的是用來快速找到資料表中所需的資訊"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "給定 16 位元運算元 A 如下：(1000 1110 1010 0101)2，今欲使用運算子與運算元 B 以將位於運算元 A 最左邊4 位元之位元值設定為 1，試問使用的運算子與運算元 B 應為何者？",
   "o": [
    "OR,(1111 0000 0000 0000)2",
    "OR, (0000 0000 0000 1111)2",
    "NOR,(1111 0000 0000 0000)2",
    "NOR,(0000 0000 0000 1111)2"
   ],
   "a": 0
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "假設一般用途暫存器的數量為 16 個，若指令格式中目的暫存器為一般用途暫存器時，其欄位的寬度至少應為多位元？",
   "o": [
    "4 位元",
    "8 位元",
    "16 位元",
    "32 位元"
   ],
   "a": 0
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "下列何者為中央處理器（CPU）將指令的執行管線化（pipeline）後造成的缺點？",
   "o": [
    "中央處理器每單位時間完成的指令數（throughput）減少",
    "容易造成記憶體流失（memory leak）",
    "快取記憶體（cache）錯失率（miss rate）增加",
    "執行時可能產生指令間的資料危障（data hazard）"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "若微處理器指令集架構可區分為 RISC（Reduced Instruction Set Computer）和 CISC（Complex Instruction SetComputer）兩種，則下列何者是 CISC 架構的微處理器？①ARM ②Intel x86 ③PowerPC ④AMD Opteron",
   "o": [
    "①②③④",
    "①②③",
    "①③",
    "②④"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者不可以被多次寫入資料？",
   "o": [
    "CD-R",
    "USB 隨身碟",
    "CD-RW",
    "磁碟機"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列有關布林函數 F(A,B,C,D)=A'CD+A'BC'+BD+ABC+AC'D 的敘述，何者正確？",
   "o": [
    "此布林函數可簡化成多個不同的積之和（sum of products）最簡式",
    "可刪除 A'BC'以簡化布林函數 F(A,B,C,D)",
    "可刪除 BD 以簡化布林函數 F(A,B,C,D)",
    "可刪除 ABC 以簡化布林函數 F(A,B,C,D)"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "∑下列電路何者為正確利用 2 對 1 多工器（2x1 MUX）實現函數 F ( A, B , C ) = m (1,2 ,4,5) 的方法？A. B. C. D.",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/104070_808_1310_11.webp",
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "若有三個程序 P1,P2,P3 到達系統的順序為 P1 最早，P2 次之，P3 最後。但因為程序間到達時間很近，所以可以視為三個程序都在時間 0 到達。假設 P1,P2, P3 之執行時間分別為 24,3,3 個時間單位。在循環式排程演算法（round-robin scheduling algorithm）下，假設一行程執行 4 個時間單位後就必須換下一行程執行，則在忽略行程切換時間的假設下，三程序的平均等待時間為何？（四捨五入到整數）註：一行程的等待時間為該行程到達至其執行結束的過程中，花費在等待其它行程的時間。",
   "o": [
    "5",
    "6",
    "7",
    "8"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列關於同步化（synchronization）的敘述，何者錯誤？",
   "o": [
    "當二個以上的程序（process）同時要讀取同一個記憶體內的資料，此時就可能有競速情況（race condition）發生",
    "目前的電腦系統已經可以設計出同步化演算法（synchronization protocols）以解決競速情況（race condition）所造成的問題",
    "一個正確的競速狀況問題的解法，必須要能保證所有相關的程序不會同時進到臨界區（critical section）中",
    "一個正確的競速狀況問題的解法，必須要能保證所有相關的程序不會在臨界區（critical section）外永遠地等待"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列所述何者不是記憶體管理的工作內容？",
   "o": [
    "動態載入程式",
    "把程序所使用的邏輯位址與記憶體的實際位址作映射",
    "程序結束後，將其所曾占用空間中的資料清除",
    "確保程序之間所使用的記憶體不能相互干擾"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列何者適合以陣列（array）來實作（implement）？①佇列（queue） ②堆疊（stack） ③堆積（heap）④鏈結串列（linked list）",
   "o": [
    "①②適合；③④不適合",
    "①②③適合；④不適合",
    "④適合；①②③不適合",
    "①②④適合；③不適合"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列何種應用問題較不適合使用堆疊（stack）資料型態解決？",
   "o": [
    "圖形（graph）的深度優先搜尋（depth-first search）問題",
    "數學運算式的四則計算問題",
    "檢查括號是否成對出現的括號平衡（parentheses balancing）問題",
    "尋找圖形中任兩點間的最短路徑問題"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "下列各樹狀結構（tree）中，何者是根據各節點（vertices）的數值所建立的 min heap？A. B. C. D.",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/104070_808_1310_17.webp",
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "假設某篇文章的章節安排如下：AbstractChapter oneSection 1.1, Section 1.2Chapter twoSection 2.1, Section 2.2, Section 2.3Conclusion以樹狀結構來表示這篇文章，將如右圖所示：若在此樹中進行走訪（traverse），則下列何種走訪方式可以排列出這篇文章的章節順序？",
   "o": [
    "前序走訪（preorder）",
    "中序走訪（inorder）",
    "後序走訪（postorder）",
    "外序走訪（outorder）"
   ],
   "a": 0
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下列演算法中，何者不是用來計算最小展開樹（minimum spanning tree）？",
   "o": [
    "Bellman-Ford 演算法",
    "Kruskal 演算法",
    "Prim 演算法",
    "Sollin 演算法"
   ],
   "a": 0
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "一個有 15 條邊（edges）之無向完全圖（undirected complete graph）共有多少個節點（vertices）？",
   "o": [
    "5",
    "6",
    "7",
    "8"
   ],
   "a": 1
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "在快速排序法（quick sort）的每個步驟中皆需從待排序的數列中選擇一個基準值（pivot），下列何者為能使此排序法最有效率之基準值？",
   "o": [
    "數列中的眾數（眾數指的是數列中出現次數最多的數值）",
    "數列中的最大值",
    "數列中的最小值",
    "數列中的中位數"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是雜湊表處理碰撞（collision）或滿溢（overflow）的方法？",
   "o": [
    "鏈結串列（chaining）",
    "再雜湊（rehashing）",
    "折疊（folding）",
    "開放定址（open addressing）"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "char string[]=''first'';為Ｃ語言的一個宣告敘述，則下列敘述何者正確？",
   "o": [
    "此陣列 string 一共有 5 個元素且此宣告與「char string[]={'f ','i','r','s','t'}; 」相同",
    "此陣列 string 一共有 6 個元素且此宣告與「char string[]={'f ','i','r','s','t','\\n'};」相同",
    "此陣列 string 一共有 6 個元素且此宣告與「char string[]={'f ','i','r','s','t','\\0'};」相同",
    "此陣列 string 一共有 7 個元素且此宣告與「char string[]={'\\0', 'f ','i','r','s','t','\\0'};」相同"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列 C++程式的執行結果輸出為何？#include <vector>#include <algorithm>#include <iostream>using namespace std;int main(){vector<int>v(4);vector<int>::iterator it;v[0]=6;v[1]=8;v[2]=4;v[3]=2;sort(v.begin()+1,v.end());cout<<v[0];}",
   "o": [
    "2",
    "4",
    "6",
    "8"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列以 C++語言撰寫的程式編譯及執行後的輸出為何？#include <iostream>#include <cstdlib>using namespace std;class P {public:P() { cout <<'P'; }};int main() {P *p = (P*)malloc(sizeof(P));free(p);return 0;}",
   "o": [
    "Ｐ",
    "空白無輸出",
    "程式發生執行錯誤",
    "程式無法通過編譯"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式後產生的輸出為何？#include <stdio.h>main() {int a = 0, b = 0;if( ((a=1)<b)&& ((b=2)<a) ) {a += 10; b += 10;}printf(“%d, %d\\n”, a, b);}",
   "o": [
    "11,12",
    "11,10",
    "1,2",
    "1,0"
   ],
   "a": 3
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "執行下列程式碼的結果為何？int i=1,j=-2,k=3;if (i>0 && ++j>0)k=j;elsek=-j;",
   "o": [
    "k=0",
    "k=1",
    "k=2",
    "k=3"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式後，產生的輸出為何？#include<stdio.h>int x;void unknown(int y) {x = 3; y = 5;}void main() {int z;x = 7; z = 9;unknown(11);printf(“%d”, x);}",
   "o": [
    "3",
    "5",
    "7",
    "11"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列的 Java 語言程式執行後輸出為何？import java.lang.*;class A{public static int value=0;public A(){ value++; }public void fun(){ value++; };}class B extends A{public B(){ super(); value--;}public void fun(){ value--; };}class test{public static void main (String[] argv){B b=new B(); fun(b);System.out.println(b.value);}public static void fun(A x){x.fun();}{",
   "o": [
    "0",
    "1",
    "-1",
    "-2"
   ],
   "a": 2
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "在 Java 程式中利用 new 指令配置到的記憶體在使用完畢後，不需要用 delete 指令將配置到的記憶體歸還，原因是 Java 採用了下列那種技術？",
   "o": [
    "Multithreading",
    "Just-in-time compilation",
    "Garbage collection",
    "Dynamic binding"
   ],
   "a": 2
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列何者不為 OSI 架構中的網路層（network layer）的功能？",
   "o": [
    "字碼轉換",
    "節點定址（addressing）",
    "路徑選擇",
    "將封包分割為標準長度"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何者目前並未包含於網路通訊設備的主要功能中？",
   "o": [
    "Store and forward",
    "Data compression",
    "Switching",
    "Multiplexing"
   ],
   "a": 1
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列關於網路處理封包碰撞的敘述，何者錯誤？",
   "o": [
    "交換器（switch）可以減少碰撞的機會",
    "IEEE 802.11 採用碰撞避免（collision avoidance）的方式來減少碰撞",
    "乙太網路會進行碰撞偵測（collision detection），若發現碰撞之後則立即重傳封包",
    "乙太網路使用碰撞偵測的方式，其效能與網路線的長度有關"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列有關 TCP/IP 網路架構的應用層（application layer）的敘述，何者錯誤？",
   "o": [
    "應用層負責提供服務給網路使用者（user）",
    "應用層提供網域名稱（domain name）與 IP 位址（address）之對映服務（mapping service）",
    "應用層提供 FTP（file transfer protocol）服務",
    "應用層傳送資料時以封包（packets）為資料單位（data unit）"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列有關超文件傳輸協定（Hypertext Transfer Protocol；HTTP）的敘述，何者錯誤？",
   "o": [
    "以純文字的形式來傳輸資料、超文件、聲音、影像等",
    "使用者要求讀取網頁時，並不需要知道網頁所在的位址",
    "HTTP 使用尋址器（locators）的觀念",
    "是用來在全球資訊網上存取資料的協定"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列關於 TCP 的敘述，何者錯誤？",
   "o": [
    "TCP 使用 key agreement 技術以實現資訊加密",
    "TCP 封包有 sequence number 欄位可以用來判斷封包是否遺失",
    "TCP 使用 congestion window 來實現 congestion control",
    "使用 TCP 前，要先建立連線"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "IEEE 802.11 協定的目的是用來建置那種網路？",
   "o": [
    "乙太網路",
    "光纖網路",
    "無線網路",
    "廣域網路"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列有關威脅資訊安全的各種攻擊之敘述，何者錯誤？",
   "o": [
    "流量分析（traffic analysis）是威脅資訊完整性（integrity）的攻擊",
    "修改（modification）是威脅資訊完整性的攻擊",
    "窺視（snooping）是威脅資訊機密性（confidentiality）的攻擊",
    "阻絕服務（denial of service；DoS）是威脅系統可用性（availability）的攻擊"
   ],
   "a": 0
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "下列檢測方法何者較適合偵測一個以加殼方法（packing）處理過的惡意軟體？",
   "o": [
    "靜態分析（static analysis）",
    "動態分析（dynamic analysis）",
    "特徵比對（signature matching）",
    "黑名單比對（blacklist matching）"
   ],
   "a": 1
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於美國國家標準與技術研究院（NIST）所定義的雲端運算（cloud computing）架構中的三個主要服務模式（service model）？",
   "o": [
    "HaaS（hardware as a service）",
    "IaaS（infrastructure as a service）",
    "PaaS（platform as a service）",
    "SaaS（software as a service）"
   ],
   "a": 0
  }
 ]
};

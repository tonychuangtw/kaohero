/* 110 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-110-1-b023'] = {
 "id": "loc-110-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 110,
 "nth": 1,
 "code": "110190",
 "subj": "b023",
 "title": "110 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "某處理器具有 32-bit 記憶位址，該處理器上具有一 32K Byte 大小的 4-way set associative cache，每個cache block 為 16 byte。該 cache 的 address tag 寬度為何？",
   "o": [
    "17",
    "18",
    "19",
    "20"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "將十進制數字 105 轉換成二進制表示，答案為：",
   "o": [
    "0100_1101",
    "0110_1001",
    "1100_1011",
    "1101_1101"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "使用多個處理器，在同一時間可以在各自處理器上運行程序這種作法稱為：",
   "o": [
    "Multiprocessing",
    "Multiprogramming",
    "Multitasking",
    "Multithreading"
   ],
   "a": 0
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於馮紐曼（von Neumann）模型定義下的子系統？",
   "o": [
    "主機版（Motherboard）",
    "算術邏輯單元（Arithmetic Logic Unit, ALU）",
    "記憶體（Memory）",
    "控制單元（Control）"
   ],
   "a": 0
  },
  {
   "n": 5,
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
   "fig": "img/q/110190_433_2512_5.webp"
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "某一多工器（multiplexer）有 4 條選擇控制線，對此多工器敘述，下列何者正確？",
   "o": [
    "該多工器有 1 個輸入通道、（至多）4 個輸出通道",
    "該多工器有 1 個輸入通道、（至多）16 個輸出通道",
    "該多工器有（至多）4 個輸入通道、1 個輸出通道",
    "該多工器有（至多）16 個輸入通道、1 個輸出通道"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "假設整數以二補數表示法儲存為 8 個位元（8-bit memory location），整數「-72」的二補數表示法，為下列何者？",
   "o": [
    "01001000",
    "11001000",
    "10110111",
    "10111000"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "有關虛擬記憶體的敘述，下列何者錯誤？",
   "o": [
    "使用 Page Table 可以將虛擬記憶體位址的頁碼（page number）轉換成實體位址的頁框碼（framenumber）",
    "Page Table 的內容（或部分內容）可以放在主記憶體",
    "即便某一程式的機械碼大小（code size）超過實體記憶體的總容量，藉由虛擬記憶體的機制，該程式仍可被 CPU 執行",
    "藉由虛擬記憶體的機制，可讓電腦裝更多的 DRAM"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是虛擬機器軟體佈建的好處？",
   "o": [
    "加快網路點擊服務的反應時間",
    "提升單機的相容性",
    "節省伺服器的數量",
    "方便的軟體測試環境"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "資料壓縮可能造成資料損耗，下列何者屬於損耗壓縮（loss compression）？",
   "o": [
    "Run-length encoding",
    "MPEG encoding",
    "Huffman coding",
    "Lempel Ziv (LZ) encoding"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "關聯式資料庫中，原本已有一個關聯（relation）表 Employee，其屬性（attributes）包括 id、name、gender、address。屬性 gender 記錄員工的性別，男性員工的 gender 欄位標記為 male，女性員工的 gender欄位標記為 female。對關聯表 Employee 使用下列那一個關聯運算，可以產生只包含男性員工元組（tuples）的資料表？",
   "o": [
    "select",
    "intersection",
    "join",
    "update"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫（relational database）中，下列何種操作，從兩個關係結合成新關係時，其原關係屬性集合不需一致？",
   "o": [
    "difference",
    "intersection",
    "join",
    "union"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "若三維陣列 A[0:5, 3:10, 1:5]中每個元素的儲存必須耗費 4 個位元組（Bytes）的記憶體，儲存此陣列，總共需要多少記憶體空間？",
   "o": [
    "240 個位元組",
    "250 個位元組",
    "960 個位元組",
    "1000 個位元組"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "若 i = 5, j = 6，且 k = 8，下列那個後置式（Postfix）數學式的運算結果，能得到最大的數值？",
   "o": [
    "ij+k*",
    "ijk*+",
    "ij*k+",
    "ijk+*"
   ],
   "a": 0
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "若以鏈結串列（Linked list）實作佇列（Queue）資料結構，則要在那裡插入一個新元素？",
   "o": [
    "在鏈結串列的開頭",
    "在鏈結串列的末尾",
    "在鏈結串列的中心位置",
    "依元素的值決定在鏈結串列的位置"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "給定下列有向圖（Directed graph），若自節點 A 出發進行優先走訪（Breadth-first search），則下列何者是可能的走訪順序？ ＿＿＿ AB D ＿＿＿ GC ＿＿＿ EF",
   "o": [
    "ABCDEFG",
    "ABDGCEF",
    "AGFDECB",
    "ABCDEGF"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "下列圖示中，左圖是一般樹而右圖是左子右兄弟樹（Left child-right sibling）的資料結構舉例。若此兩種資料結構中所有父子之間的連結和兄弟之間的連結均以雙向指標來實作，下列敘述何者錯誤？",
   "o": [
    "在一般樹的資料結構中，若使用固定個數的欄位儲存指標，則容易造成空間的浪費",
    "在計算節點與根節點（Root）的距離時，使用左子右兄弟樹不會比使用一般樹走訪（Traverse）更少的指標",
    "用左子右兄弟樹的資料結構來確認兩節點之間的父子關係在最差情況下需要檢查超過一個以上的指標",
    "用左子右兄弟樹的資料結構來確認兩節點之間的父子關係較一般樹的資料結構更有效率"
   ],
   "a": 3
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "關於無向圖（Undirected graph）頂點的分支度（Degree），下列敘述何者正確？",
   "o": [
    "具有奇數分支度的頂點個數是奇數",
    "所有頂點的分支度的總和是偶數",
    "具有偶數分支度的頂點個數是奇數",
    "偶數分支度的頂點個數多於奇數分支度的頂點個數"
   ],
   "a": 1
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "以二元搜尋法（Binary search）在 100 筆已經排序好的資料中搜尋某筆資料，最差的狀況下會進行 x次比較，下列何者正確？",
   "o": [
    "x＜10",
    "10＜= x＜50",
    "50＜= x＜99",
    "x = 99"
   ],
   "a": 0
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何種排序演算法，最適合對尚未完整蒐集的資料進行排序，例如：可能來自網路一次送來一個資料？",
   "o": [
    "Insertion sort",
    "Quick sort",
    "Merge sort",
    "Selection sort"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是二元搜尋樹（Binary search tree）？A. B. C. D.8 8 3 61 5 9 1 5 29 1 5",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/110190_433_2512_21.webp",
   "a": 0
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "若採循序搜尋（Sequential search），從 n 個未排序的數字中進行搜尋，平均要進行幾次數字比較，才能成功搜尋到特定的數字？",
   "o": [
    "n",
    "(n+1)/2",
    "(n+1)*n/2",
    "n/2"
   ],
   "a": 1
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "關於 C 指令中的&、|、以及^等運算式，下列那一個不會改變 x 的值？int x = 100;",
   "o": [
    "x&0",
    "x|1",
    "x^0",
    "x^1"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列的 C++程式中，未使用下列何種技術？#include <iostream>using namespace std;class A{private:int x;public:int y;int get(void) {return x;}};class B : A{public:int get(void) {return y+2;}};int main(){}",
   "o": [
    "inheritance",
    "encapsulation",
    "overriding",
    "template"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式迴圈執行完畢後，變數 count 的值為何？#include<stdio.h>int i;int count=1;int main(){for (i=1; i <= 10; i++){if(i%5 == 0) break;count *= (i+1);printf(\"%d\\n\", count);}printf(\"%d\", count);return 0;}",
   "o": [
    "120",
    "39916800",
    "3628800",
    "24"
   ],
   "a": 0
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列 C/C++語言程式碼片段，執行後應顯示為何？int a=2;switch(a){ case 1: printf(\"1#\");case 2: printf(\"2#\");case 3: printf(\"3#\");default: printf(\"0#\");}",
   "o": [
    "2#",
    "2#3#",
    "2#0#",
    "2#3#0#"
   ],
   "a": 3
  },
  {
   "n": 27,
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
   "fig": "img/q/110190_433_2512_27.webp"
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "考慮下列的 C 語言函數宣告，然後呼叫 f(4)，函數的回傳值為何？int f (int x){if (x <=1) return 1;else return (x * f(x-1));}",
   "o": [
    "1",
    "4",
    "10",
    "24"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言之遞迴函式，若呼叫執行 f(4)，將會輸出？void f(int n){if (n != 0){f(n/2);putchar('0'+n%2);}}",
   "o": [
    "1000",
    "100",
    "10",
    "1"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "執行下列 Python 程式後，產生的輸出為何？def unknown(input, p1, p2):input[p1], input[p2] = input[p2], input[p1]return inputinput = [10, 20, 30]print(unknown(input, 0, 1))",
   "o": [
    "10 20",
    "20 30",
    "[10, 20, 30]",
    "[20, 10, 30]"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行以下 C++程式，螢幕上的輸出為何？#include <iostream>using namespace std;class A {public: float FA (int input) {return input/3;}};class B: public A {public: float FB (int input) {return input/4;}};int main(){B object1;cout << object1.FB(12) << \"#\" << object1.FA(12);}",
   "o": [
    "4#3",
    "3#4",
    "12#12",
    "FB(12)#FA(12)"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "C++程式語言，類別 class FUN 含有一個資料成員 int me 和公用方法int getMe( ) {int me = 5;this->me = 10;return me;}如果 f 是 class FUN 的物件變數，則 f.getMe()的回傳值為何？",
   "o": [
    "0",
    "1",
    "5",
    "10"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何種網路設備，可以讓網際網路中多個節點共用一個 IP 位址？",
   "o": [
    "VPN（Virtual private network）伺服器",
    "路由器（Router）",
    "網路位址轉換器（Network address translator）",
    "DHCP（Dynamic host configuration protocol）伺服器"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列網路的那一層（OSI 模型），係關於網路的位址敘述，以及決定網路的路由（Routing）？",
   "o": [
    "傳輸層（Transport Layer）",
    "資料連結層（Data Link Layer）",
    "網路層（Network Layer）",
    "應用層（Application Layer）"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "在電腦教室常看到的雙絞線（Twisted-Pair），下列敘述何者錯誤？",
   "o": [
    "適合長距離傳輸，因此通常為網路骨幹線路使用",
    "由兩條包覆的銅線相互纏繞之通訊傳輸媒介",
    "可搭配集線器（Hub）或交換器（Switch）架構出星狀拓樸（Star Topology）網路",
    "透過兩線互相纏繞可以減少磁場之干擾"
   ],
   "a": 0
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "有關 OSI 模型的網路層（Network Layer）所提供的服務，下列敘述何者正確？",
   "o": [
    "網路層定義了有線區域網路，如乙太網路（Ethernet）的相關規格",
    "網路層的技術可以保證傳輸封包其抵達目的地的順序會與傳送的順序相同",
    "網路層封包傳送，是一種不可靠的傳送（Unreliable Delivery），中間過程可能會損壞或遺失",
    "其提供的服務包括像是 UDP（User Datagram Protocol）協定便是一種不可靠的傳輸協定"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "針對無類別域間路由 （ Classless Inter-Domain Routing, CIDR）而 言， 下列那個 IP 位址，不 在123.32.226.14/22 網域下？",
   "o": [
    "123.32.228.14",
    "123.32.224.233",
    "123.32.225.12",
    "123.32.227.12"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "有關網際網路應用，下列何者錯誤？",
   "o": [
    "網路影音平台，如 YouTube，透過串流技術（Streaming），使得播放影片不需要等到下載完整檔案就能開始播放，提升播放流暢度",
    "Facebook、Twitter 是一種社群網站平台",
    "tcpdump 工具用來探詢主機所開啟的連接埠及服務種類",
    "nslookup 工具可透過 DNS 伺服器查詢網域名稱與 IP 位址之對應"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "傳輸層安全性協定（Transport Layer Security, TLS）仰賴使用數位憑證（Digital Certificate），關於數位憑證的敘述，下列何者正確？",
   "o": [
    "自簽憑證（Self-signed Certificate）和憑證頒發機構（Certificate Authority, CA）所頒發的憑證有相同的安全性",
    "一個網域的憑證中，包含其公鑰和私鑰的值",
    "憑證頒發機構可撤銷其頒發的憑證",
    "若瀏覽器跳出憑證錯誤的警告，只要略過即可，不會影響安全性"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "有關密碼學的雜湊函數（Hash Function），下列敘述何者正確？",
   "o": [
    "安全的雜湊函數具有單向函數（One-way Function）特性，且能抵抗碰撞攻擊（Collision Resistance）",
    "AES 與 SHA 都是密碼學上的安全雜湊函數，而 AES 安全度更高",
    "是具有金鑰（Key）的一種密碼元件",
    "是一種能夠具備驗證資料來源能力的密碼技術"
   ],
   "a": 0
  }
 ]
};

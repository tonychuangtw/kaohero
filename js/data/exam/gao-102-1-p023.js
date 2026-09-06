/* 102 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-102-1-p023'] = {
 "id": "gao-102-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 102,
 "nth": 1,
 "code": "102090",
 "subj": "p023",
 "title": "102 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "下列何者（約略）等於 240 bytes？",
   "o": [
    "1 megabytes 或 106 bytes",
    "1 gigabytes 或 109 bytes",
    "1 terabytes 或 1012 bytes",
    "1 petabytes 或 1015 bytes"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "全加器之進位輸出其布林函數（Boolean function）為：",
   "o": [
    "C = xy ’z + x ’yz + xy",
    "C = xy ’z + x ’yz + x ’y",
    "C = xy ’z + x ’y ’z + xy",
    "C = x ’y ’z + x ’yz + x ’y"
   ],
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列關於記憶體階層（memory hierarchy）的描述，何者正確？",
   "o": [
    "由於現今記憶體較為便宜，所以每一層記憶體的容量應該儘量接近",
    "為了避免 CPU 存取不到資料，所以每一層記憶體的容量應該一樣大",
    "當 CPU 要存取的資料不在快取記憶體時，系統會發生分頁錯誤（page fault）的中斷",
    "如果一筆資料沒有被儲存在主記憶體（main memory）的話，就一定不會出現在快取記憶體內"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "在一個分頁系統（paging system）中，假設一個分頁（page）或分頁框（frame）皆為 4 Kbytes，且分頁表（page table）的項目（entry）0 到項目 4 所記載的分頁框號碼（frame number）分別為 2, 3, 4, 1, 0。請問邏輯位址（logical address）10 K 對應之實體位址（physical address）為何？",
   "o": [
    "10 K",
    "14 K",
    "18 K",
    "6 K"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "下列那一種記憶體的結構是由電容來組成，因此需要定時刷新（refresh）其內存值？",
   "o": [
    "Flash memory",
    "SRAM",
    "DRAM",
    "ROM"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下列那一個作業系統可以使用於非常低階、不支援虛擬記憶體技術的處理器上？",
   "o": [
    "Windows 7",
    "Ubuntu",
    "Android",
    "DOS"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是電腦系統中的資料儲存元件？",
   "o": [
    "ALU",
    "Cache",
    "Register",
    "Disk"
   ],
   "a": 0
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是系統發生輾轉（thrashing）的現象？",
   "o": [
    "CPU 使用率高",
    "磁碟忙碌",
    "記憶體不足",
    "系統效能不彰"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "一數位計算機使用 32 位元指令字組（instruction word），該字組內含下述欄位：Opcode 欄位使用 8位元，2 個暫存器欄位（Register Field）每一欄位為 6 位元，及 1 個 12 位元的立即運算元（ImmdiateOperand）／暫存器欄位。試問其可以表示的無號數（unsigned）立即運算元之範圍為何？",
   "o": [
    "0～1023",
    "0～4095",
    "-512～511",
    "-2048～2047"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "十六進位數(B65C)16 相當於十進位數的：",
   "o": [
    "(45,286)10",
    "(89,278)10",
    "(46,684)10",
    "(12,784)10"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列何者是邏輯式 A( A BC + ABC ) 的化簡結果？",
   "o": [
    "BC + ABC",
    "BC",
    "A BC",
    "ABC"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "設計一個能監視 8 個地點的防盜錄影系統，每個地點有一台攝影機，若想要利用一台錄影機輪流錄下 8 個地點的影像，應使用下列那一個裝置？",
   "o": [
    "多工器（multiplexer）：將多組輸入輪流傳送到一組輸出",
    "解多工器（demultiplexer）：將一組輸入輪流傳送到多組輸出",
    "編碼器（encoder）：將輸入的標準影像用特定的格式編碼",
    "解碼器（decoder）：將輸入的以特定格式編碼的影像解碼成為標準影像"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "64 位元作業系統相較於 32 位元作業系統，最大的優勢在於：",
   "o": [
    "可以擁有更大的定址空間（memory address space）",
    "更適合多處理器",
    "速度更快",
    "時脈更高"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "對一個多執行緒（multi-threaded）的程序（process）而言，下列那一部分不是執行緒間共享的？",
   "o": [
    "程式碼",
    "全域變數（global variables）",
    "堆疊區（stack）",
    "該程序所開啟的檔案資訊（opened file information）"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "若有三個程序 P1, P2, P3 都在時間 0 到達。假設 P1, P2, P3 之執行時間分別為 24, 4, 2 個時間單位。則在最短工作優先（Shortest-Job-First, SJF）排程演算法（scheduling algorithm）下，三程序的平均等待時間為何？（四捨五入到整數）註：一行程的等待時間為該行程到達至其執行結束的過程中，花費在等待其它行程的時間。",
   "o": [
    "2",
    "3",
    "5",
    "6"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列為有關圖形（Graph）結構與樹狀（Tree）結構相關性之敘述：①圖形（Graph）結構與樹狀（Tree）結構之相同點之一是二者之組成皆包含節點（Node）之集合與邊線（Edge）之集合② 若 D1 是一樹狀（Tree）結構則 D1 必為圖形（Graph）結構；若 D2 是一圖形（Graph）結構則 D2 不必然為樹狀（Tree）結構③若 G 是圖形（Graph）結構且其各節點之內向度數（In-degree）di 皆滿足 d i ≤ 1，則 G 必為樹狀（Tree）結構④若 G 是由 n 節點（Node）所組成之連結圖形（Connected graph）結構，則 G 必為樹狀（Tree）結構⑤若 G 是由 n 節點（Node）所組成之圖形（Graph）結構且 G 亦為一樹狀（Tree）結構，則組成 G之邊線（Edge）數為(n-1)",
   "o": [
    "①②正確；③⑤錯誤",
    "②⑤正確；③④錯誤",
    "②③正確",
    "④⑤錯誤"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "下列二元樹（binary tree），若採用中序走訪（inorder traversal），則走訪順序為何？AB ＿＿＿ CD ＿＿＿ E",
   "o": [
    "DBEAC",
    "ABCDE",
    "ABDEC",
    "DEBCA"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "一個有 n 個端點（vertices）的有向完全圖形（directed and complete graph）有多少個邊（edges）？",
   "o": [
    "n(n-1)",
    "n(n-1)/2",
    "n!",
    "n!/2"
   ],
   "a": 0
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "在選用資料結構實作二元樹（binary tree）時，下列何者正確？",
   "o": [
    "只能以鏈結串列（linked list）實作二元樹外，無法以陣列（array）實作二元樹",
    "只能以陣列實作二元樹外，無法以鏈結串列實作二元樹",
    "鏈結串列和陣列兩者皆可以用來實作二元樹",
    "鏈結串列和陣列兩者皆無法用來實作二元樹"
   ],
   "a": 2
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列那一種排序方法類似於整理手上的撲克牌（亦即一次移動一張牌的位置，來依照花色和數字排好）？",
   "o": [
    "插入排序法（insertion sort）",
    "交換排序法（exchange sort）",
    "選擇排序法（selection sort）",
    "合併排序法（merge sort）"
   ],
   "a": 0,
   "alt": [
    2
   ]
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "已知一佇列（queue）的內容為「甲、乙、丙、丁」，試問欲將其內容變更為「丁、丙、乙、甲」至少需要幾個刪除（deletion）動作和幾個新增（addition）動作？",
   "o": [
    "兩個刪除（deletion）動作，三個新增（addition）動作",
    "三個刪除（deletion）動作，兩個新增（addition）動作",
    "三個刪除（deletion）動作，三個新增（addition）動作",
    "三個刪除（deletion）動作，四個新增（addition）動作"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下圖為一個二元搜尋樹，已知所儲存的關鍵值均不相同，請問下列何者正確？ab c",
   "o": [
    "a > b > c",
    "a < b < c",
    "b < c < a",
    "b < a < c"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列有關最大堆積（max heap）的敘述，何者正確？",
   "o": [
    "子節點（child node）的鍵值（key value）必會大於等於父節點（parent node）的鍵值（key value）",
    "必為完滿二元樹（full binary tree）",
    "必為完整二元樹（complete binary tree）",
    "必為二元搜尋樹（binary search tree）"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "樹狀（Tree）結構由儲存資料之節點（Node）與連接節點之樹枝（Branch）組成。下列為有關樹狀（Tree）結構之敘述：①樹根（Root）節點是所有其他節點之父節點（Parent node）②樹根（Root）節點必為內部節點（Internal node）③樹葉節點（Leaf node）是沒有子樹（Subtree）之節點④樹葉節點（Leaf node）必有父節點（Parent node）⑤將樹狀（Tree）結構之任意一外部節點（External node）移除後，原有之樹狀（Tree）結構成為森林（Forest）結構",
   "o": [
    "①③正確；④⑤錯誤",
    "②③正確；①④錯誤",
    "②③④正確",
    "②⑤錯誤"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "請問下圖屬於那一種資料結構？8 75 2",
   "o": [
    "二元搜尋樹（binary search tree）",
    "紅黑樹（red-black tree）",
    "最大堆積（max heap）",
    "最小堆積（min heap）"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列的高階程式語言何者最早推出？",
   "o": [
    "FORTRAN",
    "C",
    "C++",
    "Java"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "程式語言中，下列何者不需要使用布林（Boolean）運算式？",
   "o": [
    "if-then-else 陳述（statement）",
    "assignment 陳述（statement）",
    "while loop 陳述（statement）",
    "for loop 陳述（statement）"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "在大部分的程式語言中，變數宣告（variable declaration）中通常包含變數的名稱（name）及變數的何項屬性？",
   "o": [
    "大小（size）",
    "長度（length）",
    "樣式（style）",
    "型別（type）"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "在 C++或 Java 程式語言中，何謂「函式重載（function overloading）」？",
   "o": [
    "多個相同名稱的函式，但參數（parameter）個數不同，或是參數型別（type）不同",
    "多個不同名稱的函式，但參數（parameter）個數相同，且參數型別（type）相同",
    "多個相同名稱的函式，且參數（parameter）個數與型別（type）皆相同，但分屬於主類別（base class）及其衍生類別（derived class）",
    "多個不同名稱的函式，且參數（parameter）個數與型別（type）皆相同，但分屬於主類別（base class）及其衍生類別（derived class）"
   ],
   "a": 0
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "以 Java 程式語言所撰寫的程式可以運行在下列何種電腦中？",
   "o": [
    "任何已安裝 Java 虛擬機器（virtual machine）的電腦",
    "任何已安裝網頁瀏覽器（Web browser）的電腦",
    "任何連接到網際網路（Internet）的電腦",
    "任何可以運行 C++程式的電腦"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式後，產生的輸出為何？#include <stdio.h>int f (int a, int b) {if (a<=0) return b+1;else if (b<=0) return f(a-1, 1);else return f( a-1, f(a, b-1) );}main() {printf(“%d\\n”, f(2, 1));}",
   "o": [
    "1",
    "3",
    "5",
    "7"
   ],
   "a": 2
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "在 Internet 架構中，網路層（network layer）主要負責任務為：",
   "o": [
    "路由（routing）",
    "建立端點對端點（end-to-end）邏輯通道（logical channel）",
    "解決網路壅塞（network congestion）情況",
    "確保資料無遺失地送達目的端主機（destination host）"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "傳統 IP（Internet Protocol）位址包含網路位址與主機位址，網路位址用來識別所屬的網路；假設網路位址為 140.112，請問有多少 IP 位址可以用來識別網路上的個別裝置？",
   "o": [
    "65536",
    "1024",
    "16384",
    "32768"
   ],
   "a": 0
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "目前一些新興的下載軟體，如：eMule, eDonkey 等軟體，屬於下列何種架構？",
   "o": [
    "傳統單機計算架構",
    "主、從架構（client-server computing）",
    "點對點架構（peer-to-peer）",
    "大型主機架構"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "有關執行下列兩個 C 語言程式結果的比較，何者正確？程式 P1 程式 P2#include<stdio.h> #include<stdio.h>int n=0; int n=0;#define f(x) n = x; void f(int x) {n = x;}main() { main() {int n = 0; int n = 0;f(1); f(1);printf(“%d\\n”, n); printf(“%d\\n”, n);} }",
   "o": [
    "兩個程式的輸出都是 0",
    "兩個程式的輸出都是 1",
    "程式片段 P1 的輸出為 0，程式片段 P2 的輸出為 1",
    "程式片段 P1 的輸出為 1，程式片段 P2 的輸出為 0"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 程式語言撰寫之程式執行後產生之輸出為何？#define PLUS(a, b) a-b#define MINUS(a, b) a+b#include <stdio.h>main(){ int ml=5, m2=3;ml = PLUS(m1+m2, m1-m2)*MINUS(m2-m1, m2+m1);printf(“%d\\n”, ml);}",
   "o": [
    "-3",
    "1",
    "36",
    "-60"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列以 C++程式語言撰寫之程式執行後的輸出為何？#include <iostream>using namespace std;class P{public:P() { cout << 'B'; }~P() {cout << 'D'; }};int main(){P p;cout << '1';if (true){cout << '2';P p2;}cout << '3';return 0;}",
   "o": [
    "BB123DD",
    "B12BD3D",
    "B1B2D3D",
    "B1B23DD"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "以下有關安全傳輸協定（Secure Socket Layer, 簡稱 SSL）的敘述，何者錯誤？",
   "o": [
    "使用 SHA-1 或 MD5 等演算法，確保資料的機密性",
    "SSL 是介於應用層與 TCP/IP 層之間的傳輸協定",
    "若使用 SSL 傳送信用卡資料，則信用卡資料會被交易的商家知道",
    "可依環境不同加入適當的加密演算法，不需重新建構新的通訊協定"
   ],
   "a": 0
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "以下何者不是網路安全憑證之認證機構（Certification Authority, CA）的主要功能？",
   "o": [
    "憑證簽發、更新與終止",
    "憑證保存",
    "憑證過戶",
    "憑證提供"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列何種電子資料安全防護機制，可以達到不可否認（non-repudiation）之安全特質？",
   "o": [
    "對稱密鑰加密（symmetric secret key encryption）",
    "非對稱公鑰加密（asymmetric public key encryption）",
    "數位摘要（digital digest）",
    "數位簽章（digital signature）"
   ],
   "a": 3
  }
 ]
};

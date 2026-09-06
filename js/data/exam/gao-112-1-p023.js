/* 112 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-112-1-p023'] = {
 "id": "gao-112-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 112,
 "nth": 1,
 "code": "112090",
 "subj": "p023",
 "title": "112 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "在設計管線式（pipeline）處理器時，需搭配各式軟硬體的設計機制，以減少管線因 data hazard 損失的運算效能。下列優化運算效能的技術，何者不能於編譯器（compiler）上實施？",
   "o": [
    "Data forwarding",
    "Instruction scheduling",
    "Register renaming",
    "Software pipelining"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "將時間切割成很多小片段，讓 CPU 不停地在許多程序（Process）之間切換執行，每位使用者以為自己的程序一直持續在執行，這種作業系統稱為：",
   "o": [
    "多元（Multi-programming）系統",
    "分時（Time-sharing）系統",
    "多執行緒（Multi-thread）系統",
    "即時（Real-time）系統"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "在記憶體階層架構裡，下列敘述何者錯誤？",
   "o": [
    "主記憶體通常使用隨機存取記憶體（RAM）",
    "CPU 裡面的暫存器（Registers）存取速度最快",
    "硬碟屬於輔助記憶體",
    "在 CPU 與主記憶體之間可以使用快閃記憶體（Flash memory）來提昇系統的效能"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "音樂 CD 的取樣頻率是 44.1 kHz，取樣位元是 16 位元，一段雙聲道 10 秒鐘的音樂，在無壓縮的情形下，需要多少位元組（Byte）來儲存？",
   "o": [
    "441,000",
    "882,000",
    "1,764,000",
    "3,528,000"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "將二進位數字 (1011 0110)2 換算為四進位數字，下列何者正確？",
   "o": [
    "(1231)4",
    "(3122)4",
    "(2312)4",
    "(1320)4"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "關於 process 與 thread 的敘述，下列何者錯誤？",
   "o": [
    "在多核心系統上的平行程式，可以在單一 process 內部執行多個 thread 的方式實現",
    "在多核心系統上的平行程式，可以多個 process 的方式實現",
    "在單一 process 內部的不同 thread 之間，可透過 global variable 交換資料",
    "在不同 process 的 thread 之間，可透過 global variable 交換資料"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "對 10110110 和 10100111 按位元（bit-wise）進行 AND 的運算，結果為下列何者？",
   "o": [
    "00010001",
    "01011101",
    "10100110",
    "10110111"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列那一種作業系統排程演算法，理論上能得到最短的平均等待時間？",
   "o": [
    "優先權（Priority）",
    "先到先做（FCFS）",
    "循環分配（RR）",
    "最短工作先做（SJF）"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "某計算機系統具有 32 bits 位址的記憶體定址空間，並包含一個 direct mapped 快取記憶體（cache） ，該快取記憶體每個 cache block 為 8 bytes，且必須儲存 17 bits 的位址做為 tag。該快取記憶體的大小為何？",
   "o": [
    "8 KByte",
    "16 KByte",
    "32 KByte",
    "64 KByte"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "將八進位數值 (625)8 換算為十六進位，下列何者正確？",
   "o": [
    "A01H",
    "195H",
    "619H",
    "215H"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "程式執行的流程有時必須根據指令執行的結果而改變，在處理器管線（Pipelining）架構中，這種情形將會引發何種危障（Hazard）？",
   "o": [
    "資料危障（Data Hazard）",
    "結構危障（Structure Hazard）",
    "控制危障（Control Hazard）",
    "程式危障（Program Hazard）"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "網路傳輸媒介中，下列何者最不受電磁波干擾？",
   "o": [
    "雙絞線",
    "光纖",
    "同軸電纜",
    "無線傳輸"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "已知某二元樹為不同數字之最大堆積（Max-heap） ，下列敘述何者正確？",
   "o": [
    "若以陣列（Array）來存放此二元樹，則此陣列中的元素必為遞減數列",
    "若以陣列來存放此二元樹，則此陣列中的元素必為遞增數列",
    "每一從樹根（Root）至樹葉（Leaf）的路徑（Path）上的元素必為遞減數列",
    "不會有上層（Level）任一元素比下層任一元素（不見得具有直屬關係）小的情形發生"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "在程式執行中，為有效地利用記憶體空間，當需要記憶體空間來存放資料時，才向系統索取所需的記憶體空間，要達到此目的，下列何種資料結構設計最合適？",
   "o": [
    "Queue",
    "Stack",
    "Circular Array",
    "Linked List"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 3,
   "needfig": true,
   "fig": "img/q/112090_444_2804_15.webp"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "假設有一棵完滿二元樹（Full binary tree）含有 n 個內部節點（Internal nodes），則該棵二元樹的總節點數是多少個？",
   "o": [
    "n+1",
    "2n-1",
    "2n+1",
    "log(n)，（log 以 2 為底）"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "傳統的電腦系統架構中，CPU 通常到那裡取得指令來執行？",
   "o": [
    "程式計數（Program Counter）暫存器",
    "通用暫存器",
    "主記憶體",
    "輔助記憶體"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "若要將 2 個各自由小到大排序好的數列（長度分別為 5 和 6）進行合併排序（Merge sort） ，使得合併後的數列也能由小到大排列，則合併過程最多需要進行幾次數字比較？",
   "o": [
    "5",
    "6",
    "10",
    "11"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下列由 C 語言程式撰寫的函數 sort 實作了何種排序法？void sort (int a[], int l, int h) {if (l >= h) return;int j, i, key;i=l; j=h; key=a[i];while (i < j) {while (i < j&&a[j] > key) j--;if (i < j) a[i++] = a[j];while (i < j&&a[i]< key) i++;if (i < j) a[j--] = a[i];}a[i] = key;if (l < i-1)sort (a, l, i-1);if (i+1 < h)sort (a, i+1, h);}",
   "o": [
    "快速排序（Quick sort）",
    "插入排序（Insertion sort）",
    "選擇排序（Selection sort）",
    "合併排序（Merge sort）"
   ],
   "a": 0
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "若以插入排序（Insertion sort）對數列（7, 10, 2, 5, 4）進行排序，下列何者是正確步驟？",
   "o": [
    "（7, 10, 2, 5, 4）->（7, 10, 2, 5, 4）->（2, 7, 10, 5, 4）->（2, 5, 7, 10, 4）->（2, 4, 5, 7, 10）",
    "（7, 10, 2, 5, 4）->（2, 7, 10, 5, 4）->（2, 4, 7, 10, 5）->（2, 4, 5, 7, 10）->（2, 4, 5, 7, 10）",
    "（7, 10, 2, 5, 4）->（7, 10, 2, 4, 5）->（2, 4, 5, 7, 10）",
    "（7, 10, 2, 5, 4）->（7, 2, 5, 4, 10）->（2, 4, 5, 7, 10）"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "若宣告下列 2 維整數陣列int a[3][3]={{1, 2},{3, 4, 5},{6}};則下列那個元素為 0？",
   "o": [
    "a[0][1]",
    "a[1][0]",
    "a[1][2]",
    "a[2][1]"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "給定一個陣列 arr ={45, 66, 78, 89, 91, 95, 120}，且欲搜尋的目標鍵值是 key = 95，則使用二元搜尋法第一次尋找、第二次尋找分別比對那個元素？",
   "o": [
    "89、95",
    "89、91",
    "78、95",
    "78、91"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "Java 程式經編譯後，會先產生什麼格式的檔案？",
   "o": [
    "Assembly code",
    "Byte code",
    "Machine code",
    "Virtual code"
   ],
   "a": 1
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "事先寫好的函式（function）經過編譯（compile）後，將目的檔（object file）集合起來存放於一個檔案供其他程式連結使用，這種檔案稱為：",
   "o": [
    "系統呼叫（System Call）",
    "虛擬碼（Pseudo code）",
    "中斷服務常式（Interrupt Service Routine）",
    "函式庫（Library）"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "如下所示之 C 程式，其輸出為何？#include<stdio.h>int data[] = {6, 8, 4, 3, 11, 18, 17, 29, 25, 23, 27, 24, 22,48, 43, 55, 68, 63, 62, 69, 65, 72, 77,85, 88, 81, 99, 97, 92, 94, 91};int count[10] = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };int main(void){int ii, nn = sizeof(data)/sizeof(data[0]);for (ii=0; ii < nn; ii++) {count[data[ii] / 10]++;}for (ii=0; ii < 10; ii+=2) {printf(\"%2d,\", count[ii]);}return 0;}",
   "o": [
    "4, 3, 6, 0, 2",
    "4, 6, 2, 5, 3",
    "3, 0, 1, 2, 5",
    "4, 3, 6, 0, 2, 1, 5, 2, 3, 5"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式，並輸入「10 10 9」，下列何者為程式的輸出？#include <stdio.h>#include<iostream>int main() {int count =0, x=10, next;scanf(\"%d\", &next);while (next == x){count++;scanf(\"%d\", &next);}printf(\"%d\", count);}",
   "o": [
    "2",
    "3",
    "9",
    "10"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "假設有一陣列 A，以主行順序（Column major order）儲存資料，若 A[5,1]位置為 1234，A[7,5]位置為1260，則 A[6,4]位置為何？",
   "o": [
    "1248",
    "1249",
    "1252",
    "1253"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "下列那個 C 語言的迴圈指令執行的次數，與其他不同？",
   "o": [
    "for (i=0;i<10;i++) ...",
    "for (i=0;i<10;++i) ...",
    "for (i=0;i++<10;) ...",
    "for (i=0;++i<10;) ..."
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "給定以下類別定義：class A{private:static int cnt;class B{private:public:};B* p[5];public:A() {cnt=0;}int f(){if (cnt<5)p[cnt++]=new B;return cnt;}};int A::cnt=-100;若在 main()中執行以下指令：A var;var.f();var.f();cout << var.f();則將產生的輸出為何？",
   "o": [
    "1",
    "3",
    "5",
    "7"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "以下 C 語言中的結構變數定義：struct A{union{struct{unsigned int i; } B;struct{unsigned short s1; unsigned short s2;} C;struct{unsigned char c1; unsigned char c2; unsigned char c3; unsigned char c4;} D;};};struct A a;a.B.i = 0x01020304;下列敘述何者正確？",
   "o": [
    "執行 printf（\"%hx\", a.C.s1）將會輸出 102",
    "執行 printf（\"%hx\", a.C.s2）將會輸出 304",
    "執行 printf（\"%d\", a.D.c1）將會輸出 1",
    "執行 printf（\"%d\", a.D.c4）將會輸出 1"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "關於 C++ 類別的建構函式（constructor） ，下列敘述何者錯誤？",
   "o": [
    "一個類別可以有多個多載（overloaded）的建構函式",
    "建構函式可以設定預設值（default value）",
    "建構函式可以回傳（return）一個常數值（constant）",
    "一個類別可以不宣告任何建構函式"
   ],
   "a": 2
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "檢查判斷網路通不通，下列何者是最常用的指令？",
   "o": [
    "mail",
    "cp",
    "pine",
    "ping"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "有關 OSI 模型網路七層架構，下列敘述何者錯誤？",
   "o": [
    "TCP 與 UDP 之運作屬於傳輸層（Transport Layer）",
    "網路層（Network Layer）的功能包含對於網路封包的切割（Fragmentation）與組裝（Defragmentation）",
    "資料連結層（Data Link Layer）提供流量控制（Flow Control）的能力",
    "網路層提供了網路路由（Routing）的功能"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 TCP 協定的特性？",
   "o": [
    "壅塞控制（Congestion Control）",
    "向發送端回報錯誤訊息",
    "流量控制（Flow Control）",
    "資料遺失重送"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "有關傳輸層安全性協定（Transport Layer Security, TLS），不提供下列那一種保護？",
   "o": [
    "匿名性",
    "保密性",
    "完整性",
    "身分認證"
   ],
   "a": 0
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "關於一次性密碼本（One-Time Pad, OTP）加密演算法，下列何者正確？",
   "o": [
    "金鑰需至少與明文一樣長",
    "金鑰可以重複使用",
    "可使用百科全書作為密碼本（金鑰）",
    "加密與解密的金鑰不同"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "揭露一個組織（無論是私有的還是公共的）內部非法的、不誠實的或者不正當行為的人，稱為：",
   "o": [
    "安全管理技術",
    "吹哨者保護條款",
    "網路主權",
    "吹哨者"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "網路封包在傳送的過程中，由較高層往較低層傳送時，會加上標頭（Header） ，這動作稱為：",
   "o": [
    "多工",
    "解多工",
    "封裝",
    "解封裝"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式以指標處理陣列，執行後會產生何種輸出？int a[] = {1, 2, 3, 4}, n = sizeof(a)/sizeof(int), *p = a, *q = &a[n-1], temp;while (p < q){temp = *p;*p++ = *q;*q-- = temp;}printf(\"%d %d %d %d\", a[0], a[1], a[2], a[3]);",
   "o": [
    "1 2 3 4",
    "2 3 4 1",
    "3 4 1 2",
    "4 3 2 1"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列何者為合法的 Media Access Control（MAC）位址？",
   "o": [
    "01:23:45:67:89:AB:CD",
    "67:89:AB:CD:EF:GH",
    "01:23:45:67:89:AB",
    "01:23:45:67:89"
   ],
   "a": 2
  }
 ]
};

/* 104 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-104-1-p023'] = {
 "id": "gao-104-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 104,
 "nth": 1,
 "code": "104080",
 "subj": "p023",
 "title": "104 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "以一張 16 MB（224 Bytes）的記憶卡而言，在不考慮標頭檔大小的情況下，最多可以存放幾張 1024 × 768 尺寸大小的全彩（每一個像素占 24 個位元）未壓縮圖像？",
   "o": [
    "7 張",
    "70 張",
    "700 張",
    "7000 張"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "設有一單聲道的音樂 CD，其取樣頻率為 44.1 KHz，每次取樣所需位元數為 16 bit；若將音樂從 CD 取出，不經壓縮直接儲存在硬碟上，則每分鐘的音樂所需的硬碟容量為何？",
   "o": [
    "352.8 KByte",
    "5.292 MByte",
    "176.4 KByte",
    "10.584 MByte"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "關聯式資料庫（relational database）中有一個表格 order，根據 SQL 標準執行了下列 SQL 指令“CREATETRIGGER unknown AFTER INSERT ON order……”，則下列敘述何者正確？",
   "o": [
    "當我們對 order 表格新增一筆資料後，此 trigger 內定義的內容會自動被執行",
    "我們可以隨時視需要呼叫此 trigger 執行其定義的內容",
    "此 trigger 會替 order 新增數筆資料",
    "此 trigger 會把 order 表格內原先不正確的資料刪除"
   ],
   "a": 0
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "關聯式資料庫（relational database）系統使用下列何種結構，以便從表格中取出符合特定屬性值的資料列（tuple）？",
   "o": [
    "索引（index）",
    "綱要（schema）",
    "觸發程序（trigger）",
    "虛擬關聯（view）"
   ],
   "a": 0
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "某處理器以八位元（bit）暫存器儲存數值，並以二補數（two's complement）編碼記錄有號數（signed numbers）。下列十進位數值中，何者無法以一個暫存器記錄？",
   "o": [
    "128",
    "-128",
    "37",
    "127"
   ],
   "a": 0
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "關於管線化（pipelining）技術的描述，下列何者錯誤？",
   "o": [
    "一定需要增加額外的管線暫存器（pipeline register）",
    "一定需要特殊編譯器的配合",
    "一定需要危障（hazard）偵測電路",
    "可以提高程式的執行效能"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "有關直接記憶體存取（DMA），下列何者錯誤？",
   "o": [
    "通常使用一個 DMA 控制器來配合",
    "DMA controller 要取得匯流排的控制權需先發訊號向 CPU 請求",
    "DMA controller 使用匯流排的期間，CPU 無法取得匯流排的使用權",
    "DMA 可以執行 I/O 設備對記憶體或記憶體之間的資料傳送"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "一個 8 位元漣波計數器（ripple counter）從(01100111)2 往上計數（count up）到下一個值時，試問有多少個正反器（flip-flops）會作補數（complement）變換？",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "有一個磁碟，其結構有兩面（surface），每面有 203 條磁軌（track），每一磁軌上有 512 位元組（Byte），則這個磁碟的容量為何？",
   "o": [
    "25,984 Bytes",
    "207,872 Bytes",
    "103,936 Bytes",
    "51,968 Bytes"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下圖電路的功能以布林函數（Boolean function）的方式描述，何者正確？ABSC（A+B+C） B.S＝A（B+C）A.S＝（A+B） C.S＝AB+ ABC D.S＝A+C",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/104080_442_1504_10.webp",
   "a": 1,
   "alt": [
    2
   ]
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "設有 2 個 3 位元的輸入變數(x2x1x0)2 與(y2y1y0)2，試問在 3x3 無號數乘法器（3x3 unsigned multiplier）中，下列何者是部分積（partial products）正確的圖示表示？A. x2 x1 x0 B. x2 x1 x0y2 y1 y0 y2 y1 y0x2 y0 x1 y0 x0 y0x2 y0 x1 y0 x0 y0x2 y1 x1 y1 x0 y1x2 y2 x1 y2 x0 y2 x2 y1 x1 y1 x0 y1x2 y2 x1 y2 x0 y2x2 x1 x0 x2 x1 x0C. D. y2 y1 y0y2 y1 y0x2 y0 x1 y0 x0 y0 x2 y2 x2 y0 x1 y0 x0 y0x2 y1 x1 y1 x0 y1 x2 y1 x1 y1 x0 y1x2 y2 x1 y2 x0 y2 x1 y2 x0 y2",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/104080_442_1504_11.webp",
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於網路作業系統？",
   "o": [
    "Windows Server 2003",
    "Windows CE",
    "Solaris",
    "NetWare"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "使用磁碟陣列時，下列那一種機制對資料的保護最差？",
   "o": [
    "Raid 0",
    "Raid 1",
    "Raid 2",
    "Raid 3"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列程序排程方法中，何者的預期平均等待時間最短？",
   "o": [
    "先到先服務（first-come, first-served）",
    "最短工作優先（shortest-job-first）",
    "循環執行（round-robin）",
    "最長工作優先（longest-job-first）"
   ],
   "a": 1
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
   "fig": "img/q/104080_442_1504_15.webp"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "與單向鏈結串列（singly linked list）相比，雙向鏈結串列（doubly linked list）具有下列那項優點？",
   "o": [
    "可以較快速找到某一節點的後一節點",
    "可以較快速找到某一節點的前一節點",
    "可以較快速找到串列的第一節點",
    "每一節點使用的記憶體空間較少"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "若以陣列來實作一個最大堆積（max heap）資料結構，並將陣列中的元素依序列出，請問下列何者不可能？",
   "o": [
    "16, 14, 10, 8, 7, 9, 3",
    "16, 10, 14, 9, 3, 8, 13",
    "16, 15, 10, 11, 7, 13, 5",
    "16, 12, 10, 9, 8, 7, 6"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "關於算術式 5－4／（3＊2）＋1 的二元樹表示法（expression tree），其樹根（root）、樹根左子（root's leftchild）及樹根右子（root's right child）等節點所存之值分別為何？",
   "o": [
    "樹根為＋，樹根左子為／，樹根右子為 1",
    "樹根為－，樹根左子為 5，樹根右子為／",
    "樹根為＋，樹根左子為－，樹根右子為 1",
    "樹根為－，樹根左子為 5，樹根右子為＋"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "擁有 3 個端點（vertices）v0, v1, v2 的圖形（graph）可用下列的相鄰矩陣（adjacency matrix）表示。下列敘述何者正確？v0 v1 v2v0 ⎡0 1 0 ⎤v1 ⎢1 0 1 ⎥⎢ ⎥v2 ⎢⎣0 0 0 ⎥⎦",
   "o": [
    "該圖形為無向圖形（undirected graph）",
    "該圖形為完全圖形（complete graph）",
    "端點 v2 的分支度（degree；為入分支度（in-degree）與出分支度（out-degree）之和）為 0",
    "端點 v1 的分支度為 3"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "最小擴張樹（Minimal spanning tree）演算法中，每次只選一條 edge、且在起始時一定要選最小成本的 edge的是：",
   "o": [
    "Dijkstra 演算法",
    "Prim 演算法",
    "Sollins 演算法",
    "Kruskal 演算法"
   ],
   "a": 3
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "一般而言，於資料搜尋（search）時，下列那一資料結構的平均時間複雜度（time complexity）最低？",
   "o": [
    "鏈結串列（linked list）",
    "雜湊表（hash table）",
    "二元搜尋樹（binary search tree）",
    "陣列（array）"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "已知程式如下，下列敘述何者正確？#include<stdio.h>#include<iostream>main(){char n1[10], n2[10];gets(n1);gets(n2);if (n1 == n2)printf(\"YES\");elseprintf(\"NO\\n\");system(\"PAUSE\");}",
   "o": [
    "若輸入兩個字串\"Alice\"與\"Alice\"，則輸出 YES",
    "若輸入兩個字串\"Alice\"與\"Alice\"，則輸出 NO 並跳行",
    "若輸入兩個字串\"Alice\"與\"Kent\"，則輸出 YES",
    "編譯時出現錯誤訊息"
   ],
   "a": 1
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "搜尋引擎（search engine）可以讓使用者輸入關鍵字，然後回傳相關的網頁。下列何者與搜尋引擎的技術無關？",
   "o": [
    "關鍵字出現在一個網頁的次數",
    "網頁間的超連結（hyperlink）",
    "網頁的美觀程度",
    "其他使用者點選的紀錄"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列傳輸媒介，何者具有最快的傳輸速度？",
   "o": [
    "光纖",
    "同軸電纜",
    "無遮蔽式雙絞線",
    "遮蔽式雙絞線"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列有關 TCP/IP 網路架構資料鏈結層（data-link layer）的敘述何者錯誤？",
   "o": [
    "資料鏈結層負責「點對點的資料框（point-to-point frame）」傳送",
    "路由器（router）之架構不包含資料鏈結層",
    "有些資料鏈結層協定也包含錯誤控制（error control）與流量控制（flow control）",
    "資料鏈結層位址一般稱作實體位址（physical addresses）或媒體存取控制層位址（media access control, orMAC addresses）"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列有關距離向量尋徑法（distance vector routing，是路由器建立路由表 routing table 的一種方法）的敘述何者正確？",
   "o": [
    "路由器（router）會將與其相鄰路由器的路徑資訊廣播給網路上所有其他路由器",
    "可能會產生尋徑迴圈（routing loop）的問題",
    "非規則性事件發生（譬如某一段連線斷線）時該路由表才會更新",
    "主要是根據 Dijkstra 最短路徑演算法來建立路由表"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列有關串流控制傳輸協定（Stream Control Transmission Protocol；SCTP）的敘述何者錯誤？",
   "o": [
    "適用於網路電話",
    "適用於影片串流",
    "適合於即時傳輸",
    "不具備 TCP 的優點"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "下列關於 ARP（Address Resolution Protocol）協定的三個敘述中，請選出所有正確者：①ARP 可根據 MAC 位址找出 IP 位址 ②「ARP 請求」（ARP Request）封包係以單向方式傳送 ③ARP快取內的紀錄有給定的壽命，逾時便會消失",
   "o": [
    "①②",
    "②③",
    "①③",
    "③"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "在使用 Outlook 等軟體收發電子郵件前，你需要設定所欲使用的伺服器。下列敘述何者錯誤？",
   "o": [
    "SMTP 伺服器為寄信伺服器",
    "POP3 伺服器為收信伺服器",
    "IMAP 伺服器為寄信伺服器",
    "可設定使用加密連線收取電子郵件"
   ],
   "a": 2
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "Wi-Fi 指的是採用下列何種標準的無線網路？",
   "o": [
    "IEEE 802.3",
    "IEEE 802.11",
    "IEEE 1394",
    "IEEE 802.16"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "若某入侵者在網頁瀏覽器輸入下列網址：「http://1234567890」，則他最有可能在進行下列何種攻擊？",
   "o": [
    "URL obfuscation",
    "SQL injection",
    "Unicode directory traversal",
    "Cross-site scripting"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列關於對稱性與非對稱性加密演算法的敘述何者錯誤？",
   "o": [
    "對稱性加密演算法使用相同的金鑰進行加密與解密",
    "非對稱性加密演算法使用不同的金鑰進行加密與解密",
    "非對稱性加密演算法以接收者的私鑰來加密資料",
    "加解密的速度較慢是非對稱性加密演算法的缺點"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列關於電腦病毒的敘述何者錯誤？",
   "o": [
    "蠕蟲攻擊會主動散播至其他電腦",
    "蠕蟲攻擊會感染其他檔案",
    "特洛伊木馬的攻擊不會主動散播至其他電腦",
    "間諜程式（spyware）會擅自收集被攻擊者的資料"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "有關下列兩個 C 語言程式片段的敘述，何者正確？程式片段 P1 程式片段 P2int A[100]; int A[100];n = 100; n = 100;void sort1 () { void sort2 () {int i, j, t; int i, j, t;for( i=1; i<n; i++){ for( i=1; i<n; i++){for( j=0; j<n-i; j++) { for( j=0; j<n; j++) {if(A[j]>A[j+1]) { if(A[j]>A[j+1]) {t = A[j]; t = A[j];A[j] = A[j+1]; A[j] = A[j+1];A[j+1] = t; A[j+1] = t;} }} }} }} }",
   "o": [
    "兩者用的排序法都是氣泡排序法",
    "程式片段 P1 用的是氣泡排序法，程式片段 P2 用的是選擇排序法",
    "程式片段 P1 用的是選擇排序法，程式片段 P2 用的是氣泡排序法",
    "兩者用的排序法都是選擇排序法"
   ],
   "a": 0
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言程式使用的是何種排序法？#include <stdio.h>int main (void) {in a[10]={2,3,4,1,-1,0,10,8,9,10};in i,j;int iMin;for (j = 0; j < 10-1; j++) {iMin = j;for (i = j+1; i<10; i++) {if (a[i] < a[iMin]) {iMin = i;}}if (iMin !=j) {int tmp = a[j]; a[j] = a[iMin]; a[iMin]= tmp;}}return 0;}",
   "o": [
    "氣泡排序（bubble sort）",
    "選擇排序（selection sort）",
    "快速排序（quick sort）",
    "合併排序（merge sort）"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 語言撰寫的程式執行後產生的輸出為何？void increment( int i){i++;}int main(){ int i;for(i = 0; i < 10; increment(i)) {}printf(\"i=%d\\n\", i);return 0;}",
   "o": [
    "輸出為：i=9",
    "輸出為：i=10",
    "此程式無法編譯",
    "此程式會進入無窮迴圈"
   ],
   "a": 3
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列 Java 程式執行結果輸出為何？import java.lang.*;import java.util.*;class test{public static void main (String[] argv){List<Integer> list=new ArrayList<Integer>();list.add(Integer.valueOf(2));list.add(Integer.valueOf(4));list.add(Integer.valueOf(6));list.add(Integer.valueOf(8));Collections.reverse(list);System.out.println(list.get(0));}}",
   "o": [
    "2",
    "4",
    "6",
    "8"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "有關以下 C 語言撰寫之程式，下列敘述何者正確？#include <stdio.h>#include <iostream>main(){int a, b, c;scanf(\"%d\",\"%d\", &a, &b);c=max(a, b);printf(\"%d\\n\", c);system(\"PAUSE\");}",
   "o": [
    "若輸入兩個整數 36,19，則輸出為 36 並跳行",
    "若輸入兩個整數 36,19，則輸出為 19 並跳行",
    "若輸入兩個整數 36,19，則輸出為 0 並跳行",
    "編譯時應該會出現錯誤或警告訊息"
   ],
   "a": 3
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "int i=-1,j=-2,k=3;if(i>0 && ++j>0)k=j;elsek=-j;上述程式碼執行後 k 值為何？",
   "o": [
    "k=0",
    "k=1",
    "k=2",
    "k=3"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列 Java 語言程式碼執行後輸出為何？import java.lang.*;class test{public static void main (String[] argv){int num[]={12,8,4,16};int step[]={5,20,15,10};int i, j, temp;for(i=1;i<step.length;i++){j=step[i]%num.length;if (j==0) j++;temp=num[j-1];num[j-1]=num[j];num[j]=temp;}System.out.println(num[3]);}}",
   "o": [
    "4",
    "8",
    "12",
    "16"
   ],
   "a": 0
  }
 ]
};

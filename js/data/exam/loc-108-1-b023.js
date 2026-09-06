/* 108 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-108-1-b023'] = {
 "id": "loc-108-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 108,
 "nth": 1,
 "code": "108190",
 "subj": "b023",
 "title": "108 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "三進位數值 (2102)3 以十進位表示，下列何者正確？",
   "o": [
    "29",
    "32",
    "65",
    "75"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "在某些應用環境中，計算機必須因應外部事件的要求，於規定的時限內完成對該事件的處理，則應該選用下列那類作業系統？",
   "o": [
    "分散式系統（distributed system）",
    "批次系統（batch system）",
    "分時系統（time-sharing system）",
    "即時系統（real-time system）"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列何種語言只能用於資料庫的操作上？",
   "o": [
    "BASIC",
    "C",
    "HTML",
    "SQL"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "作業系統中 Critical Section Design 必須滿足的條件，不包含下列何者？",
   "o": [
    "任何一個時間點，最多只允許一個 Process 進入 Critical Section",
    "必須在有限的時間內，自那些想進入 Critical Section 的 Process 中，挑選出一個進入 Critical Section",
    "進入 Critical Section 之每個 Process 分配到固定的時間片段",
    "Process 提出進入 Critical Section 之申請，到它獲准進入之等待時間必須是有限的"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "假設關聯式資料庫中的某個表格 ENROLL 如下表所示，其第 1 列表示該表格所定義的三個屬性（attribute），而第 2-4 列為該表格中所記錄的三筆資料列（tuple）。針對該表格執行以下 SQL 查詢句：「select count(*) from ENROLL where ID = ‘B01’;」，則會輸出下列何值？ID COURSE GRADEB01 OS 65B01 PL 30B02 DB 90",
   "o": [
    "1",
    "2",
    "3",
    "null"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "分頁法（paging）在作業系統記憶體管理中，可以直接解決什麼問題？",
   "o": [
    "內部碎裂（internal fragmentation）",
    "外部碎裂（external fragmentation）",
    "輾轉現象（thrashing）",
    "Belady’s 異常（anomaly）"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "一般而言，CPU 連接到記憶體和周邊裝置的機制為何？",
   "o": [
    "匯流排（bus）",
    "繪圖處理機（graphics processing unit）",
    "網路介面（network interface）",
    "DMAC（direct memory access controller）"
   ],
   "a": 0
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列有關雲端運算環境中，責任劃分依據為何？",
   "o": [
    "SLA（service level agreement）",
    "TOC（total of cost）",
    "DDoS（distributed denial of service）",
    "PAAS（platform as a service）"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "使用冗餘廉價磁碟機陣列（RAID）的主要目的是下列那一項？",
   "o": [
    "降低使用多個磁碟的成本",
    "提供多人使用的環境",
    "提升磁碟的可靠性及存取效能",
    "加大磁碟存取的容量"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "強化的二次機會演算法（enhanced second chance algorithm）是一種作業系統內部之分頁置換演算法（pagereplacement algorithm）。該演算法除了參考每一個分頁的存取位元（reference bit）外，還參考修改位元（modification bit）之資訊，請問其參考修改位元的主要目的為何？",
   "o": [
    "減少分頁置換之時間",
    "減少分頁錯誤率（page fault rate）",
    "增加分頁使用機率",
    "增加程式可使用之分頁數"
   ],
   "a": 0
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列何者是關聯式資料模式（Relational Data Model）的基本「資料結構」（Data Structure）？",
   "o": [
    "表格（Table）",
    "陣列（Array）",
    "樹（Tree）",
    "堆疊（Stack）"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "有關點陣圖（Bitmap image）與向量圖（Vector image）之敘述，下列何者錯誤？",
   "o": [
    "構成點陣圖影像的基本單位是像素（Pixel）",
    "向量圖可任意放大縮小旋轉，圖形品質皆不變",
    "點陣圖放大時，圖形品質變差",
    "向量圖可直接利用數位相機拍攝而得"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "如果一個二元搜尋樹以後序（postorder）方式走訪（traversal）的結果為一個嚴格遞增數列（即：x1 < x2< …< xn），1 < n，則下列敘述何者恆為正確？",
   "o": [
    "此二元搜尋樹為歪向左傾的樹（left skewed，即所有非樹葉節點都只有左子）",
    "此二元搜尋樹為歪向右傾的樹（right skewed，即所有非樹葉節點都只有右子）",
    "此二元搜尋樹既不為歪向右傾，亦不為歪向左傾",
    "此二元搜尋樹的高度必為二"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "根據 C 語言的語法宣告一個陣列如下：「int temp[8];」，若 temp 在記憶體中的位置為 S，且一個整數的大小為 4 bytes，則下列何者為 temp[3]在記憶體中的位置？",
   "o": [
    "8",
    "12",
    "S+8",
    "S+12"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式的結果為何？#include<stdio.h>int unknown(int temp[], int size, int key){int i = 0;while( (temp[i] != key) && (i < size))i++;return(i);}void main(){int list[]={1,3,5,7,9,11,13,15};int output =unknown(list, 8, 3);printf(\"%d\", output);}",
   "o": [
    "輸出整數 1",
    "輸出整數 3",
    "輸出整數 8",
    "進入無窮迴圈程式無法停止"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "給定一個空的佇列 Q，試問執行完以下程式碼後，佇列 Q 中內容為何？Q.enqueue(5)Q.enqueue(10)Q.dequeue()Q.enqueue(3)Q.dequeue()",
   "o": [
    "3",
    "5",
    "10",
    "空佇列"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "若四維陣列 A[-2:3,0:2,2:5,1:5]是以列主序（Row-major）的方式排列資料，而此陣列在記憶體中的初始位置為 500，且陣列中的每個元素的儲存皆需要 4 個位元組（Bytes）。請問陣列 A[0,1,4,2]存放在記憶體中的位置始於多少？",
   "o": [
    "820",
    "824",
    "1104",
    "1108"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "在 100 個整數中找出其中最大的整數，至少要執行幾次「數字比較」，才能確保找到的是正確答案？（注意：一次「數字比較」會比較兩個數字，譬如：比較 5 和 3 何者較大。）",
   "o": [
    "0",
    "1",
    "99",
    "100"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "對一個有九個節點的二元搜尋樹（Binary Search Tree）作前序訪問（preorder traversal），並依序輸出訪問節點的數值，其結果如下（次序由左至右）：12, 9, 7, 8, 20, 15, 13, 16, 22。在此樹中共有多少個節點為葉節點（Leaf）？",
   "o": [
    "3",
    "4",
    "5",
    "6"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "若對以下二元樹（binary tree）採用前序走訪（preorder traversal），則走訪順序為何？AB ＿＿＿ CD ＿＿＿ E",
   "o": [
    "DBEAC",
    "ABCDE",
    "ABDEC",
    "DEBCA"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下圖中可產生多少種不同的生成樹（Spanning Tree）？",
   "o": [
    "1440",
    "2000",
    "2880",
    "4200"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列何者排序演算法在最差情況下（worst case）的時間複雜度最佳？",
   "o": [
    "選擇排序（selection sort）",
    "快速排序（quick sort）",
    "堆積排序（heap sort）",
    "氣泡排序（bubble sort）"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "以下的 C++程式中，使用了下列何種技術？#include <iostream>using namespace std;int fun(int x){return x;}int fun(char x){return 0;}int main(){cout<<fun('a');}",
   "o": [
    "inheritance",
    "encapsulation",
    "overloading",
    "overriding"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "假設在 C 語言中變數 i 的資料型態為 int，其數值為 0 到 9 的數，請問下列何者敘述列印結果與其它選項不一樣？",
   "o": [
    "printf(\"%d\",i);",
    "printf(\"%c\",i);",
    "printf(\"%c\",i+'0');",
    "printf(\"%1.0f\",(float)i);"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列有關 C++與 Java 程式語言的比較，何者正確？",
   "o": [
    "Java 是物件導向程式語言，C++不是",
    "C++支援類別（class）的宣告，Java 不支援",
    "C++支援類別的多重繼承（multiple inheritance），Java 不支援",
    "Java 支援抽象資料型態（abstract data type），C++不支援"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "假如在 C 程式中有一個名稱為 A 的整數陣列，其中A[1]=20A[2]=30A[3]=40A[4]=50A[5]=60而其中假設已知道 A[1]是放置於記憶體位置 33221100。而程式又宣告 int *ptr=A, 則下列敘述何者正確？",
   "o": [
    "*(A+4) 為 20",
    "*(ptr+2) 為 30",
    "ptr 為 33221100",
    "&ptr 為 33221100"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕會印出幾個'$'？int main( ) {for(int i=0;i<10;i=i+2){for(int j=0;j<i;j=j+3)cout<<'$';}return 0;}",
   "o": [
    "8",
    "9",
    "12",
    "15"
   ],
   "a": 0
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式時struct {char d[10];}a,b,c;scanf(\"%s\",a.d);scanf(\"%s\",b.d);strcat(strcpy(c.d,b.d),a.d);printf(\"%s\",c.d);若分別輸入\"abc\"，\"def\"，則輸出為何？",
   "o": [
    "cbafed",
    "fedabc",
    "abcdef",
    "defabc"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "關於軟體工程的模組化（modularity）之敘述，下列何者錯誤？",
   "o": [
    "結構圖表（structure chart）是以模組化方式呈現系統",
    "系統內的模組，彼此之間的耦合（coupling）愈少愈好",
    "系統內的模組，彼此之間的凝聚（cohesion）愈大愈好",
    "僅適用於物件導向設計（object-oriented design）"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列何者為 C 語言中之邏輯 AND 運算子（operator）？",
   "o": [
    "AND",
    "&",
    "&&",
    "∥"
   ],
   "a": 2
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int A[4][3]={2,4,6,8,10,12,14,16,18,20,22,24};int *p1=A[3];int *p2;p2=p1-6;cout<< *p2 <<endl;return 0;}",
   "o": [
    "6",
    "8",
    "10",
    "12"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是物件導向程式語言的主要特性？",
   "o": [
    "封裝（encapsulation）",
    "繼承（inheritance）",
    "平行（parallelism）",
    "多型（polymorphism）"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何者無法降低電腦中毒的機率？",
   "o": [
    "啟動防毒軟體並定期更新病毒的定義檔",
    "啟動防火牆",
    "定期做完整的備份",
    "不開啟陌生人寄來的電子郵件中所夾帶的可執行檔"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是網際網路控制訊息協定（ICMP）所負責的項目？",
   "o": [
    "回應要求（Echo request）",
    "位址遮罩應答（address mask reply）",
    "路徑選擇（routing）",
    "錯誤回報（error reporting）"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "數位簽章的計算頗為耗時，下列何者是加速其計算的主要方法？",
   "o": [
    "資料切割",
    "雜湊函數",
    "資料編碼",
    "金鑰管理"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列那一個協定或應用與其他協定或應用相較，不屬於 OSI 參考模型同一層？",
   "o": [
    "TCP",
    "UDP",
    "ICMP",
    "SCTP"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下面的圖形可稱之為：",
   "o": [
    "完全圖（complete graph）",
    "樹（tree）",
    "二分圖（bipartite graph）",
    "連結圖（connected graph）"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "電信網路自那一代開始，語音資料及數據資料都是透過封包交換的機制？",
   "o": [
    "1G",
    "2G",
    "3G",
    "4G"
   ],
   "a": 3
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "在 ISO 提出的 OSI（Open System Interconnection）七層模型中，下列何者負責資訊的編碼與轉碼、以及加密解密等工作？",
   "o": [
    "網路層（network layer）",
    "會議層（session layer）",
    "表現層（presentation layer）",
    "應用層（application layer）"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "全球資訊網（world wide web）運作的主從架構是依據下列何種協定？",
   "o": [
    "FTP",
    "SMTP",
    "HTTP",
    "ICMP"
   ],
   "a": 2
  }
 ]
};

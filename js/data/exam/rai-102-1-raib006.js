/* 102 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-102-1-raib006'] = {
 "id": "rai-102-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 102,
 "nth": 1,
 "code": "102080",
 "subj": "raib006",
 "title": "102 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "假設虛擬記憶體的虛擬位址（virtual address）是 32-bit，一個分頁（page）的大小是 4KB，則該虛擬記憶體共有幾個分頁？",
   "o": [
    "220",
    "232",
    "212",
    "218"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列何者是中央處理器中控制單元（control unit）所扮演的角色？",
   "o": [
    "執行數值（arithmetic）、邏輯（logic）、移位（shift）等運算",
    "儲存指令運算完畢後的結果",
    "決定中央處理器中每一個硬體單元的執行順序",
    "當作快取記憶體使用"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列那一種記憶體關掉電源後，資料不會遺失？",
   "o": [
    "DRAM",
    "Cache",
    "SRAM",
    "Flash Memory"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "磁碟陣列（RAID）比單顆硬碟有多個方面的好處：增強資料整合度，增強容錯功能，增加處理速度或容量。RAID 0 將資料直接存入每顆硬碟上，RAID 1 在不同的硬碟上映射複製（mirror）資料，RAID 5 則是將資料平均分散到每顆硬碟並且加入錯誤更正碼。下列關於 RAID 0、RAID 1 和 RAID 5 的敘述，何者一定是錯誤的？",
   "o": [
    "將兩顆讀取速度皆為 50MB/s 的硬碟組成 RAID 0，理想上的讀取速度可到達 100MB/s",
    "將三顆各 100GB 的硬碟組成 RAID 5，則可用容量為 200GB",
    "將兩顆各 100GB 大小的硬碟組成 RAID 1，則可用容量為 200GB",
    "RAID 5 的資料可靠度較 RAID 1 低，但磁碟空間利用率較 RAID 1 高"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "有兩個二進位的有號整數（signed integer）： X = 1010100 ， Y = 1000011 ，若使用二的補數進行 X－Y的運算，則結果為何？（注意：假設 X、Y 原為七位數而結果為以八位元表示。）",
   "o": [
    "10010001",
    "11101110",
    "01101111",
    "00010001"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下圖是 8×1 的多工器（multiplexor），A、B、C 為選擇信號且分別對應至 20, 21, 22，D0~D7 為輸入信號，假設需要輸出 Y = (A + B) ⋅ (A + C ) ，請問 D7~D0 設定值為何？D0D1 選擇 輸出D2 C B A YD30 0 0 D0D4D5 Y 0 0 1 D1D6 . . . .D7. . . .A 1 1 1 D7BC",
   "o": [
    "D7 ~ 0 = 10101010B",
    "D7 ~ 0 = 10101011B",
    "D7 ~ 0 = 11101111B",
    "D7 ~ 0 = 10101000B"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "兩個 BCD 數元(1000 0100)BCD 與(0111 0110)BCD 相加後，其和為：",
   "o": [
    "(0110 0000)BCD",
    "(1 0110 0000)BCD",
    "(01100000)2",
    "(101100000)2"
   ],
   "a": 1
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "一時序電路（sequential circuit）由 1 個 D 正反器（flip-flop）與 5 個邏輯閘所組成，如下圖所示，其中 B、C1、C2、C3 為輸入位元，A 為狀態位元，試問 A 之狀態方程式為何？C1 C2 C3BDACLK C",
   "o": [
    "A( t + 1) = C1AB + C 2 (AB + AB)",
    "A( t + 1) = C1AB + C2 ( A B + AB)",
    "A( t + 1) = C1AB + C 2 ( AB + AB) + C3A",
    "A( t + 1) = C1AB + C2 ( A B + AB) + C3A"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "一電路如下圖所示，其中 TS（three-state）表示三態閘，Inv（inverter）表示反向器，試問該電路的布林函數(F)為何？A InvB TSFInv TS",
   "o": [
    "F = A B + AB",
    "F = AB + AB",
    "F= A+B",
    "F= A+ B"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "假設一個半加器（half adder）的輸入訊號是 x 與 y，輸出訊號是 S(sum)與 C(carry)。下列何者正確？",
   "o": [
    "S = x + y ， C = xy",
    "S = xy ， C = x + y",
    "S = x ⊕ y ， C = xy",
    "S = x + y， C = x ⊕ y"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列關於分頁技術（paging）的敘述，何者錯誤？",
   "o": [
    "由分頁表（page table）來處理分頁（page）位址（或號碼）與分頁框（frame）位址（或號碼）的轉換",
    "會有外部斷裂（external fragmentation）情況",
    "允許一個行程所使用的記憶體散布在不相鄰的多個分頁框（frame）中",
    "一個系統可能存在不只一種分頁大小（page size）"
   ],
   "a": 1
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列何者並非手持行動裝置（如：智慧型手機）的主要設計目標？",
   "o": [
    "色彩更豐富的使用者介面",
    "多工處理（multiprogramming）",
    "回應時間（response time）",
    "多人使用環境（multi-user）"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "對於一般的作業系統而言，下列何種元件無法支援隨插即用（意指：必須將整個系統關機後再安裝該項元件）？",
   "o": [
    "USB 硬碟",
    "快閃記憶體（如：CF 記憶卡）",
    "隨機存取記憶體（main memory）",
    "USB 光碟機"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列那一項動作不需要利用系統呼叫（system calls）來處理？",
   "o": [
    "終止行程（terminate process）",
    "開啟舊檔（open file）",
    "呼叫使用者函式（call user function）",
    "顯示時間與日期（get time and date）"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下圖為資源分配圖（resource-allocation graph），其中正方形代表資源，圓形代表行程。下列敘述何者與此圖所描述的事實相符？R1P1 P2R2",
   "o": [
    "系統中存在著死結",
    "P1 在執行的過程當中只需要 R1 這項資源",
    "P1 在執行的過程當中只需要 R2 這項資源",
    "R2 這項資源已經分配給 P2"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列關於 Round-Robin 程序排程演算法（process scheduling algorithm）的敘述，何者錯誤？",
   "o": [
    "Round-Robin 排程是可用於分時系統（time-sharing system）設計的排程演算法",
    "如果 Round-Robin 排程的時間區段（time quantum）越長，則其與 First-Come First-Served 的排程效果越接近",
    "由於 Round-Robin 排程能使不同程序獲得公平的 CPU 資源，所以屬於非搶先（non-preemptive）排程法的一種",
    "使用 Round-Robin 排程時，頻繁的切換程序（context switching）會影響系統效能"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "有一個樹狀結構如下：12 2026 36 38下列敘述何者正確？",
   "o": [
    "是二元搜尋樹（binary search tree）且是完整二元樹（complete binary tree）",
    "是完整二元樹",
    "是二元樹（binary tree）且是歪斜樹（skewed tree）",
    "是完滿二元樹（full binary tree）"
   ],
   "a": 1
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列資料結構何者可最快找到最大的元素項？",
   "o": [
    "二元搜尋樹（binary search tree）",
    "佇列（queue）",
    "引線二元樹（threaded binary tree）",
    "最大堆積（max-heap）"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "3 個節點能形成多少種二元樹？",
   "o": [
    "3",
    "4",
    "5",
    "6"
   ],
   "a": 2
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者是樹狀結構中序走訪法（inorder traversal）的結果？DC ＿＿＿ EA ＿＿＿ B ＿＿＿ F ＿＿＿ G",
   "o": [
    "ABCDEFG",
    "ACBDFEG",
    "DCABEFG",
    "ABCFGED"
   ],
   "a": 1
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "在個人工作站上，從電子郵件伺服器下載個人電子郵件時，使用下列何種通訊協定？",
   "o": [
    "POP3",
    "FTP",
    "SMTP",
    "HTTP"
   ],
   "a": 0
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "Java 程式語言中，在沒有型別轉換（type cast）的情況下，下列那一個指定陳述（assignment statement）是不被允許的？",
   "o": [
    "指定一個 short 值到一個 long 變數",
    "指定一個 byte 值到一個 double 變數",
    "指定一個 int 值到一個 float 變數",
    "指定一個 long 值到一個 byte 變數"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式執行後，m3 之值為何？C 程式語言之程式片段int ml=11, m2, m3=1;for ( m2=m3; m1 >=m2; ml--){m1 = m1 – m2;m3 = m1 + m3;m1 = m1 - 1;}",
   "o": [
    "21",
    "22",
    "23",
    "24"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列程式語言，何者是以直譯（interpretation）方式執行的程式語言？",
   "o": [
    "ADA",
    "FORTRAN",
    "C",
    "PHP"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "已知一 C 語言程式中，宣告陣列 A 為 int A[10][8]，且 A 在記憶體的位址為 0x0000（0x 代表 16 進位表示法），若每個 int 資料使用 2 個位元組（byte），請問 A[5][5]使用的記憶體位址為何？",
   "o": [
    "0x0210",
    "0x0110",
    "0x0090",
    "0x005A"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "有關下列 C 語言程式片段的敘述，何者正確？int x =1;float y = 2.5;x = x + y;",
   "o": [
    "該程式片段完全符合 C 語言的資料型態規定，無需編譯程式（compiler）進行資料型態強制轉換（coercion）",
    "編譯程式必須對該程式片段進行 1 次資料型態強制轉換後，以完成編譯",
    "編譯程式必須對該程式片段進行 2 次資料型態強制轉換後，以完成編譯",
    "該程式片段在編譯時會產生資料型態錯誤的訊息，無法完成編譯"
   ],
   "a": 2
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "有關執行下列 C 語言程式片段後的敘述，何者正確？int A[3] = {0, 0, 0};int x = 1;A[x++] = --x;",
   "o": [
    "執行後，A[0] = 0",
    "執行後，A[1] = 0",
    "執行後，A[1] = 1",
    "執行後，A[2] = 1"
   ],
   "a": 0,
   "alt": [
    1
   ]
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "有關下列 C 語言程式的敘述，何者正確？#include <stdio.h>main() {int S = 0, i;for( i = 1; i < 10; i++) S +=i;printf(“%d\\n”, S);}",
   "o": [
    "for 迴圈未使用大括號({})，因此不算是結構化程式",
    "for 迴圈執行結束時，變數 i 的值為 10",
    "編譯時會產生變數 i 未設初始值的警告",
    "全部程式共有兩個未宣告的變數 d 和 n"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "C 或 C++語言的 switch 結構中，下列那一個保留字（reserved word）代表「如果所有條件（case）都不成立，則控制程式將跳到該處執行」？",
   "o": [
    "do",
    "else",
    "then",
    "default"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 程式語言撰寫之程式執行後產生之輸出為何？#include <stdio.h>void swap(int *lhs, int *rhs){int *tmp;tmp = lhs;lhs = rhs;rhs = tmp;}int main() {int a = 10, b = 20;swap(&a, &b);printf(“%d %d”, a, b);return 0;}",
   "o": [
    "10 20",
    "20 10",
    "20 20",
    "10 10"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列何者為物件導向程式設計（object-oriented programming）最主要的特性？",
   "o": [
    "抽象資料型態（abstract data types）",
    "多維陣列（multiple-dimensional arrays）",
    "全域變數（global variables）",
    "遞迴（recursion）"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "資料庫查詢語言中，如選取資料時，希望能將重複的資料只顯示一筆，應使用何關鍵字？",
   "o": [
    "SINGLE",
    "MERGE",
    "DISTINCT",
    "DELETE"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是無線網路標準？",
   "o": [
    "IEEE 802.3",
    "IEEE 802.11",
    "IEEE 802.15",
    "IEEE 802.16"
   ],
   "a": 0
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "在 Internet 架構下，下列何者屬於傳輸層（transport layer）的通訊協定（protocol）？",
   "o": [
    "TCP",
    "P2P",
    "ARP",
    "FTP"
   ],
   "a": 0
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "學生資料表中，包含（學號、姓名、主修）等欄位，且其中畫底線部分代表該資料表之主要鍵值。若將這一個學生資料表分割為兩個資料表 A 及 B，則下列那一個資料表分割不會造成資訊的遺失？",
   "o": [
    "A（學號、主修）、B（姓名、主修）",
    "A（學號、主修）、B（學號、姓名）",
    "A（學號、姓名）、B（姓名、主修）",
    "A（學號、主修）、B（主修、學號）"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "某循序電路（sequential circuit）經狀態化簡（state reduction）後，剩餘 10 個狀態。若以 D 正反器（D flip-flop）作為此電路之記憶元件，所需之正反器個數最少為：",
   "o": [
    "4個",
    "6個",
    "8個",
    "10 個"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列有關 IP 安全通訊協定（Internet protocol security, 簡稱 IPSec）的敘述，何者錯誤？",
   "o": [
    "是一套開放標準網路安全協定，可以實現資料的機密性（confidentiality）、鑑定性（authentication）、完整性（integrity）及存取控制（access control）等安全服務",
    "包含 AH（authentication header）、ESP（encapsulation security playload）與 HMAC（hash messageauthentication code）三個運作協定",
    "提供傳輸模式（transportation mode）與隧道模式（tunnel mode）二種通訊模式",
    "是虛擬私人網路（virtual private network, VPN）的安全通訊協定之一"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "安裝下列軟體，何者最可能導致作業系統的安全性變差？",
   "o": [
    "安裝正版的 Microsoft Windows",
    "安裝網路分享軟體",
    "安裝 Microsoft Office",
    "安裝網路瀏覽器firefox（從http://www.mozilla.org/下載）"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "下列關於軟體的敘述，何者錯誤？",
   "o": [
    "付費軟體就是一般常見的商業軟體，要付費取得授權才能使用",
    "使用者可以免費使用免費軟體（freeware），但是著作權人仍擁有著作權",
    "在任何情況下，使用者均不能散布共享軟體（shareware）",
    "公共軟體（public domain software）還是有著作權，不能任意竄改"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於公開金鑰密碼系統（public-key cryptosystem）？",
   "o": [
    "AES（Advanced Encryption Standard）system",
    "RSA（Rivest, Shamir, Adleman）system",
    "DES（Data Encryption Standard）system",
    "Triple DES（Triple Data Encryption Standard）system"
   ],
   "a": 1
  }
 ]
};

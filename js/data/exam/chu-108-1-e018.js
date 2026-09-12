/* 108 年　初等考試　資料處理大意（50 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['chu-108-1-e018'] = {
 "id": "chu-108-1-e018",
 "cat": "civil",
 "exam": "chu",
 "stage": 1,
 "roc": 108,
 "nth": 1,
 "code": "108010",
 "subj": "e018",
 "title": "108 年　初等考試　資料處理大意",
 "subjName": "資料處理大意",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "int func(int n) { if (n<10) return n; else return ((func(n/10) + n%10)%10); }int main(void) { int n = 1357; printf(\"%d\", func(n)); return 0; }請問上列 C 程式之輸出為何？",
   "o": [
    "5",
    "6",
    "7",
    "9"
   ],
   "a": 1
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "已知遞迴函數 F(0)=0, F(1)=1,當 n>1 時 F(n)=F(n-1)+2F(n-2)+4，則 F(5)是等於多少？",
   "o": [
    "51",
    "67",
    "77",
    "105"
   ],
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "明文（plain text)「A」以「C」替代、「B」以「D」替代、「C」以「E」替代，以此類推，最後「Z」以「B」替代，明文「COMPUTER」經此替代法（substitution)後，密文（cipher text)為下列何項？",
   "o": [
    "EQORWVGT",
    "DXEFDATE",
    "FRPSXWHU",
    "DPNQVUFS"
   ],
   "a": 0
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "邏輯函數 F(A,B)=A+B+AB+1，下列何者與 F(A,B)等價？",
   "o": [
    "F(A,B)=AB",
    "F(A,B)=B",
    "F(A,B)=A",
    "F(A,B)=1"
   ],
   "a": 3
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "資料探勘（Data Mining）演算法或稱數據挖掘（Data Mining，DM）又稱資料庫中的知識發現（KnowledgeDiscover in Database，KDD）是指從大量資料中擷取出有意義的資訊，以便達成有效業務統計的一種資料分析方法。不包含下列何項？",
   "o": [
    "空間序列分析（Space Series Forecasting analysis）",
    "分類分析（Classification analysis）",
    "群集分析（Clustering analysis）",
    "關聯分析（Association analysis）"
   ],
   "a": 0
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "網路分成完全連接（fully connected network）及部分連接（partial connected network），下列敘述何者正確？",
   "o": [
    "前者連線少而後者代價低",
    "前者連線少而後者代價高",
    "前者連線多而後者代價低",
    "前者連線多而後者代價高"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "廣義費氏數列（Fibonacci numbers）定義如下：F(0)=0, F(1)=1, F(i) = F(i-l) +2F(i-2) for i >1， F(10)為何？",
   "o": [
    "251",
    "266",
    "279",
    "341"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "1 TB 是 256 GB 的 x 倍，而 1 PB 是 128 TB 的 y 倍，x, y 各為多少？",
   "o": [
    "8,16",
    "8,8",
    "4,8",
    "2,4"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "INSERT INTO dbo.Emp(emp_id, emp_name, birth_date, salary）VALUES(1, N'John', '1970-1-1', 30000),(2, N'Peter', '1971-1-1', 46000),(3, N'Linda', '1972-1-1', 42000),(4, N'Alice', '1973-1-1', 38000);上述 SQL 語法中 N 是表示：",
   "o": [
    "萬用碼（unicode）",
    "Numeric",
    "NIL",
    "NULL"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "承上題，SELECT COUNT(*) FROM dbo.Emp WHERE salary>40000；上述 SQL 語法中其輸出結果為何？",
   "o": [
    "5",
    "4",
    "3",
    "2"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列排序方法（sorting algorithm）中，以那一種排序法的平均速度最慢？",
   "o": [
    "基數排序（Radix sort algorithm）",
    "氣泡排序（Bubble sort algorithm）",
    "分而治之/各個擊破（divide and conquer）的合併排序（Merge sort algorithm）",
    "分而治之/各個擊破（divide and conquer）的快速排序（Quick sort algorithm）"
   ],
   "a": 1
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "利用中文氣泡排序法（Bubble Sort），一個中文字依序輸入“背後看人”排序成“看人背後”，則其逆序數（inversion number）：即需幾次交換次數為何？",
   "o": [
    "4",
    "5",
    "6",
    "7"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "有一個二維陣列（array）A(-1:5, -4:2)之起始位址 A(-1,-4)= 1100，以行為主（Major In Column; MIC）排列，假設陣列（array）內元素長度都為 1，A(1,1)所在位址為何？",
   "o": [
    "1118",
    "1119",
    "1137",
    "1138"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "設有一個二維陣列（array）A 以行為主順序（column major order） 儲存資料，A[0,0] 為陣列第一個位址，若 A[2,3] 位址為 1652，A[4,7] 位址為 1678，則 A[3,5]位址為何？",
   "o": [
    "1665",
    "1668",
    "1686",
    "1688"
   ],
   "a": 0
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列 C++程式之輸出為何？long trib(int n){if (n <=2) return (10-n);else return (6*(trib(n-3) + trib(n-1))-11* tirb(n-2));}void main(){int i=1, j =17,x=13;x-=(i<<3);cout<< j% x+ trib(4)<<endl;}",
   "o": [
    "22",
    "23",
    "24",
    "25"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "給定遞迴時間複雜度（time complexity）方程式 T(n)=T(n/3)+n for n>1 其初值 T(1)=5，下列敘述何項錯誤？",
   "o": [
    "T(3)=8",
    "T(9)=17",
    "T(27)=44",
    "T(n) ∈ O(nlgn )"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "在圖形（graph）上做廣度優先式搜尋（Breadth First Search, BFS），下列何者為最適用的資料結構（datastructure）？",
   "o": [
    "佇列（queue）",
    "連結串列（linked list）",
    "堆疊（stack）",
    "二元搜尋樹（binary search tree）"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列那種常見技術是利用部分硬碟解決主記憶體空間不足的問題？",
   "o": [
    "同步記憶體（concurrent memory）",
    "快取記憶體（cache memory）",
    "虛擬記憶體（virtual memory）",
    "唯讀記憶體（read-only memory）"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下列何者是編譯式程式語言的特點？",
   "o": [
    "執行前不需要先轉譯成機器碼",
    "重複執行時不需要重新編譯",
    "編譯式執行效率低於直譯式程式",
    "有彈性開發環境及快速的開發流程"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者為輸入裝置？",
   "o": [
    "喇叭",
    "螢幕",
    "滑鼠",
    "印表機"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下列何者是結構化程式設計的主要控制結構？",
   "o": [
    "迴圈（iteration）、選擇（selection）、循序（sequence）",
    "迴圈（iteration）、選擇（selection）、跳躍（jump）",
    "跳躍（jump）、循序（sequence）、迴圈（iteration）",
    "跳躍（jump）、循序（sequence）、選擇（selection）"
   ],
   "a": 0
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "在 Excel 儲存格中的數字顯示出「#####」符號，其最有可能原因是：",
   "o": [
    "一種科學記號表示方式",
    "顯示資料的儲存格寬度不足",
    "數字和文字的型態轉換錯誤",
    "參照到無效的儲存格位址"
   ],
   "a": 1
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "Phython 語言係採用何種程式來執行？",
   "o": [
    "組譯程式",
    "編譯程式",
    "直譯程式",
    "連結程式"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "(93.625)10 轉換為下列各種進位時，何者錯誤？",
   "o": [
    "(1011101.101)2",
    "(1131.11)4",
    "(135.5)8",
    "(5D.A)16"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "OSI 網路七層架構中，那一層負責規劃或選擇資料傳送的最佳路徑？",
   "o": [
    "資料鏈結層（data link layer）",
    "網路層（network layer）",
    "傳輸層（transport layer）",
    "會議層（session layer）"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "TCP 協定位於 OSI 網路七層架構中的那一層？",
   "o": [
    "表達層（presentation layer）",
    "應用層（application layer）",
    "會議層（session layer）",
    "傳輸層（transport layer）"
   ],
   "a": 3
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "在傳輸層（transport layer）中，可利用軟體機制解決以下傳輸問題，何者錯誤？",
   "o": [
    "不會遺失（lost）",
    "不會逾時 （timeout）",
    "不會重複（duplicate）",
    "不會失序 （out-of-order）"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "一個半雙工（half-duplex）傳輸系統是：",
   "o": [
    "單向傳輸",
    "單向傳輸，且可以同時進行",
    "雙向傳輸，且可以同時進行",
    "雙向傳輸，但不可同時進行"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫中，資料層次由小到大為：",
   "o": [
    "Field, Record, Table",
    "Schema, Field, Table",
    "Record, Schema, Table",
    "Table, Schema, Record"
   ],
   "a": 0
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列何者傳輸媒介具有較大的頻寬及較長的傳輸距離？",
   "o": [
    "雙絞線（twisted pain）",
    "光纖電纜（optical fiber）",
    "同軸電纜（coaxial cable）",
    "紅外線（infrared）"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "市內電話是依據下列何種資料交換機制運作？",
   "o": [
    "訊息交換（message switching）",
    "電路交換（circuit switching）",
    "分封交換（packet switching）",
    "資料交換（data switching）"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列有關點對點（Peer-to-Peer）的傳輸模式何者正確？",
   "o": [
    "使用者只能扮演 Client 端的角色",
    "需透過伺服器分享資訊或共用內容",
    "資源可集中處理，管理方便且較有一致性",
    "Client 端互相連接直接分享資訊或共用內容"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "網路拓樸（topology）代表的意義為：",
   "o": [
    "網路的傳輸速度",
    "網路的傳輸距離",
    "網路的佈線架構",
    "網路的規模大小"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "現在的程式設計師較少用機器語言來撰寫程式，其主要原因是：",
   "o": [
    "機器語言可讀性較低",
    "機器語言執行指令速度慢",
    "機器語言對硬體控制能力差",
    "機器語言在 CPU 無法直接執行"
   ],
   "a": 0
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列 IP 位址的表示，何者錯誤？",
   "o": [
    "210.241.139.97",
    "140.123.321.57",
    "192.168.0.1",
    "121.221.122.121"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "在 Windows 下想檢視基本網路連線的基本資訊，可用何種網路指令查詢？",
   "o": [
    "telnet",
    "netstat",
    "ipconfig",
    "tracert"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "物件導向程式的三大特色下列何者正確？",
   "o": [
    "封裝（encapsulation）、繼承（inheritance）、多型（polymorphism）",
    "封裝（encapsulation）、繼承（inheritance）、委派（delegation）",
    "繼承（inheritance）、多型（polymorphism）、合成（composition）",
    "繼承（inheritance）、合成（composition）、委派（delegation）"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "有關個人資料保護法的描述，何者正確？",
   "o": [
    "個人資料保護法的規範不限定於公務機關與特定行業",
    "以紙本記錄的個人資料不受到個人資料保護法的保護",
    "透過第三者間接蒐集他人資料不需要告知當事人",
    "僅蒐集他人個資但尚未處理或利用並不需要告知當事人"
   ],
   "a": 0
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "下列何者通訊技術是經由讀取器（Reader）接收標籤（Tag）經由天線（Antenna）所發出之無線訊號，以建立資料傳輸？",
   "o": [
    "快速響應矩陣碼 （Quick Response Code, QR Code）",
    "低功耗藍牙 （Bluetooth Low Energy, BLE）",
    "無線射頻識別 （Radio Frequency Identification, RFID）",
    "全球定位系統 （Global Positioning System, GPS）"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "市面上所謂的「綠色電腦」指的是：",
   "o": [
    "電腦及其週邊設備是綠色的",
    "上網及執行速度很快的電腦",
    "具環保、節能特性的電腦",
    "有創新零組件的電腦"
   ],
   "a": 2
  },
  {
   "n": 41,
   "pt": 1,
   "type": "single",
   "q": "有關網路霸凌行為的描述，何者錯誤？",
   "o": [
    "以令人尷尬、不堪入目的文章影像張貼，威脅恐嚇人會造成被霸凌者的身心健康傷害",
    "盜用帳號或冒充他人身分散布不實謠言並不犯法",
    "透過網路留言、通訊軟體或線上遊戲的辱罵對方，即使匿名也構成霸凌行為",
    "在網路上發表對師長誇大不實的負面言論即是構成網路霸凌"
   ],
   "a": 1
  },
  {
   "n": 42,
   "pt": 1,
   "type": "single",
   "q": "有關 Web2.0 的描述何者錯誤？",
   "o": [
    "以使用者為中心來創造、協作，如維基百科",
    "使用者主導網路資源，成為內容的分享及提供者",
    "使用者能主動獲取或是系統自動推薦相關的內容以取代無效的廣告",
    "有別於 Web1.0 的靜態呈現，Web2.0 強調高度網路互動"
   ],
   "a": 2
  },
  {
   "n": 43,
   "pt": 1,
   "type": "single",
   "q": "在物件導向程式語言中，變數及使用變數的函數打包在一起成為一個物件，下列何者最能描述此種特性？",
   "o": [
    "合成（composition）",
    "封裝（encapsulation）",
    "多型（polymorphism）",
    "委派（delegation）"
   ],
   "a": 1
  },
  {
   "n": 44,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是企業使用資料庫主要原因？",
   "o": [
    "加強資料的一致性與完整性",
    "減少資料的備份及回復的次數",
    "維持資料的保密性與安全性",
    "降低資料儲存空間及成本"
   ],
   "a": 1
  },
  {
   "n": 45,
   "pt": 1,
   "type": "single",
   "q": "下列何者為資料庫進行二階正規化（2NF）的目的？",
   "o": [
    "資料表中有主鍵，其他欄位都相依於主鍵",
    "沒有任何兩筆以上完全重覆的資料",
    "去除各欄位與主鍵間遞移相依的關係",
    "去除各欄位與主鍵間部分相依的關係"
   ],
   "a": 3
  },
  {
   "n": 46,
   "pt": 1,
   "type": "single",
   "q": "顧客關係管理（Customer Relationship Management, CRM）是當今電子商務很重要的一環，下列何者非主要目的？",
   "o": [
    "隨時找尋服務顧客的機會",
    "不斷的督促顧客購買商品",
    "協助顧客解決問題",
    "從現有顧客發掘更多潛在顧客"
   ],
   "a": 1
  },
  {
   "n": 47,
   "pt": 1,
   "type": "single",
   "q": "因第三方支付方式日漸興盛，如 Apple Pay、Line Pay、街口支付等行動支付工具屬於何種現代化商業機能？",
   "o": [
    "經流、金流",
    "商流、金流",
    "金流、資訊流",
    "物流、資訊流"
   ],
   "a": 2
  },
  {
   "n": 48,
   "pt": 1,
   "type": "single",
   "q": "在未經原著者同意的情況下，在網路上任意轉貼其創作品，下列何者正確？",
   "o": [
    "只是共同觀賞，沒有商業行為並不違法",
    "已侵害作者的著作權",
    "已觸犯個人資料保護法",
    "已觸犯原著的隱私權"
   ],
   "a": 1
  },
  {
   "n": 49,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫中，何者的鍵值可被允許重複？",
   "o": [
    "主鍵（Primary Key）",
    "候選鍵（Candidate Key）",
    "超鍵（Super Key）",
    "外來鍵（Foreign Key）"
   ],
   "a": 3
  },
  {
   "n": 50,
   "pt": 1,
   "type": "single",
   "q": "有關物聯網（Internet of Things, IOT）的描述何者正確？",
   "o": [
    "其定義僅包含物與物之間的相聯",
    "其架構包含「實體層」、「網路層」、「應用層」",
    "規劃物聯網中的感測器節點，首要必須考慮資料傳輸速率",
    "指透過無線通訊、感測技術及網路技術互相連接，以實現智慧生活"
   ],
   "a": 3
  }
 ]
};

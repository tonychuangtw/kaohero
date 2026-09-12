/* 102 年　初等考試　資料處理大意（50 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['chu-102-1-e018'] = {
 "id": "chu-102-1-e018",
 "cat": "civil",
 "exam": "chu",
 "stage": 1,
 "roc": 102,
 "nth": 1,
 "code": "102010",
 "subj": "e018",
 "title": "102 年　初等考試　資料處理大意",
 "subjName": "資料處理大意",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "設 B＝1，C＝2，計算 A＝B＋C 時控制單元到何處取出代表 B 位址及 C 位址之值，再送到算術及邏輯運算單元（ALU）進行相加？",
   "o": [
    "輸入單元",
    "記憶體",
    "輸出單元",
    "中央處理單元"
   ],
   "a": 1
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "當主記憶體的空間無法容納執行程式所占的記憶體空間時，下列那個技術可以克服此問題？",
   "o": [
    "虛擬記憶體（Virtual Memory）",
    "多重程式（Multi-programming）",
    "分時系統（Time-sharing System）",
    "快取記憶體（Cache Memory）"
   ],
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "假設有一移動讀寫頭式磁碟，共有 200 個磁軌，由 0 至 199 編號，如果目前讀寫頭的位置在第 53 個磁軌，且磁碟需求佇列中有如下的磁軌等待排程：98、183、37、122、14、124、65 及 67，今採用尋找時間最短者先排程（shortest-seek-time-first），則讀寫頭移動的總軌數為多少？",
   "o": [
    "200",
    "224",
    "236",
    "250"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "如果有一台雷射印表機，規格為 1200 DPI，30 PPM，則打算印出 120 頁的 Word 標準文件，需時多久？",
   "o": [
    "40 分鐘",
    "4 分鐘",
    "2 分鐘",
    "10 分鐘"
   ],
   "a": 1
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "假設有五個批次程序（A、B、C、D、E），同時送電腦執行，它們的執行時間分別是 5、4、3、2、1 分鐘，如果該電腦是以最短程式優先（Shortest Job First）的方式排班，則該五程序平均回轉時間（Turnaround Time）是多少分鐘？",
   "o": [
    "3 分鐘",
    "6 分鐘",
    "7 分鐘",
    "9 分鐘"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "(EB8)16、(96)10與(X)2分別表示十六進位制、十進位制與二進位制的數值，若(EB8)16＋(96)10＝(X)2，則X＝？",
   "o": [
    "101100110010",
    "110100110110",
    "111100011000",
    "111100101111"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "一個非零的二進位制數字，往左移（left shift）三位後，若沒有發生溢位（overflow），其值為原來的：",
   "o": [
    "3 倍",
    "4 倍",
    "8 倍",
    "9 倍"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "在 Microsoft Excel 的工作表中，儲存格 A1 到 A5 的值分別是 14、6、8、12、20，則在儲存格 B1 輸入下列何種內容所得到的數值最小？",
   "o": [
    "=AVERAGE (A1:A5)",
    "=COUNT (A1:A5)",
    "=IF (A1<A4,A3,A2-3)",
    "=RANK (A5,A1:A5)"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "假設 push X 代表將資料 X 壓入堆疊中，pop 代表從堆疊取出資料，請問一個空堆疊（Empty Stack）經過下列步驟順序，何者最後一個 pop 出來的會是 B？",
   "o": [
    "push A, pop, push B, pop, push C, pop",
    "push A, push B, pop, pop, push C, pop",
    "push A, pop, push B, push C, pop, pop",
    "push A, push B, push C, pop, pop, pop"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "算術式(A-B)*(C+D)之前序式（prefix）為何？",
   "o": [
    "*AB-CD+",
    "AB-CD+*",
    "-AB*+CD",
    "*-AB+CD"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列 Java 程式執行結果，請問 S 的數值為何？int S=0; M=7;for(int i=M; i>=0; i-=2)S=S+i;",
   "o": [
    "16",
    "17",
    "28",
    "29"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "假設 M 為一個二維陣列，M(3,2)的位址是 1110，M(2,3)的位址是 1115。假設每一個元素占一單位，陣列 M宣告為 M(m,n)，請問下列敍述何者正確？",
   "o": [
    "M(5,4)的位址在 1138",
    "M(2,2)的位址在 1106",
    "m 的值為 9",
    "M(1,4)的位址在 1120"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "在 SQL 語言中，要從「員工資料表」中，列出「薪資」欄位大於平均薪資值的員工，下列 WHERE 語句何者正確？",
   "o": [
    "WHERE M=AVG (薪資) AND (薪資)>M;",
    "WHERE 薪資>SUM (薪資);",
    "WHERE 薪資>(SELECT AVG (薪資) FROM 員工資料表);",
    "WHERE SELECT AVG (薪資) FROM 員工資料表 AND 薪資>SUM (薪資);"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "當電腦系統中斷（Interrupt）發生時，系統處理的步驟有下列幾項：①取得中斷處理程式的位址 ②儲存程式目前的狀態，包含暫存器、程式計數器等資訊 ③執行中斷處理程式 ④作業系統取得 CPU 的控制權⑤回復中斷發生前的執行狀態，並繼續程式執行的動作。正確順序為何？",
   "o": [
    "⑤③②①④",
    "①③②④⑤",
    "④②①③⑤",
    "②①③④⑤"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "你在今日下午 2:00（14:00）時建立資料庫的備份，在今日下午 4:00（16:00）時建立名為 Customer 的資料表，並將資料匯入至該資料表，伺服器在今日下午 5:00（17:00）時失效。你執行系統恢復（recovery）的指令碼，只將今日下午 2:00 的備份套用至資料庫，執行此指令碼的結果是什麼？",
   "o": [
    "指令碼失敗",
    "Customer 資料表不受影響",
    "Customer 資料表存在，但沒有資料",
    "Customer 資料表不存在"
   ],
   "a": 3
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "Product 資料表包含下列資料：ID ＿＿＿ Name ＿＿＿ Quantity123 ＿＿＿ Spoon 33261 ＿＿＿ Fork ＿＿＿ 17378 ＿＿＿ Plate 20459 ＿＿＿ Taiwan 51你執行下列陳述式：SELECT COUNT (*) FROM Product WHERE Quantity>30此陳述式傳回的值是什麼？",
   "o": [
    "20",
    "84",
    "51",
    "2"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "可供任何人使用和發布的免費軟體是：",
   "o": [
    "共享軟體（shareware）",
    "自由軟體（freeware）",
    "防毒軟體（antivirus software）",
    "盜版軟體（software piracy）"
   ],
   "a": 1
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "在設定電子郵件的那一項功能時，可能會選用 POP3？",
   "o": [
    "收信",
    "寄信",
    "通訊錄",
    "郵件規則"
   ],
   "a": 0
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "由國際標準組織（International Standard Organization: ISO）所訂定的 OSI 通訊協定中，那一層具有安排資料傳輸路徑（routing）的功能？",
   "o": [
    "實體層（Physical Layer）",
    "網路層（Network Layer）",
    "資料鏈結層（Data Link Layer）",
    "應用層（Application Layer）"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "關於 SSL 的敘述，下列何者錯誤？",
   "o": [
    "可以提供可靠的客戶端身分辨識功能",
    "網址如果是 https://開頭，表示受到 SSL 保護",
    "SSL（Secure Sockets Layer）是一種資料保密協定",
    "可以防止資料在傳輸過程中被第三者竊取而了解內容"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下列何者非行動電話通訊標準？",
   "o": [
    "GSM",
    "AMPS",
    "GPRS",
    "GPS"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列那一種通訊協定用來傳送電子郵件？",
   "o": [
    "MIME",
    "ICMP",
    "SNMP",
    "SMTP"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "電子郵件以下列何種格式可將程式、圖片等當成郵件附件傳送？",
   "o": [
    "IMAP",
    "POP3",
    "MIME",
    "SMTP"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列那一個是正確的 IPv4 位址？",
   "o": [
    "127.0.0.1",
    "140.113.23.256",
    "163.74.7.198.2",
    "192.73.192"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "電子憑證（Certificate Authority, CA）是指：",
   "o": [
    "網路交易的身分證明",
    "合法軟體的序號",
    "應用軟體開發商代碼",
    "作業系統使用者帳號"
   ],
   "a": 0
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "當你由你的電腦送出電子郵件後，下列敘述何者正確？",
   "o": [
    "你的郵件經由網路直接送至收件人的電腦",
    "你的郵件先送至你的電子郵件伺服器中再送至收件人的電腦",
    "你的郵件先送至收件人的電子郵件伺服器再轉送至收件人的電腦",
    "你的郵件先送至你的電子郵件伺服器中再送至收件人的電子郵件伺服器中⎧a, 若a < b"
   ],
   "a": 3
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "遞迴函數 G 定義為 G (a, b) = ⎨ ，則 G (123, 2) 之函數值為何？⎩G ( a − 3b, b), 若a ≥ b",
   "o": [
    "0",
    "-1",
    "-2",
    "-3"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "對於單向鏈結串列（single linked list）而言，下列何種操作需要最多執行步驟？",
   "o": [
    "在鏈結指標所指節點與上一節點間插入一新的節點",
    "在鏈結指標所指節點與下一節點間插入一新的節點",
    "存取目前指標所指向之節點",
    "將鏈結指標移動到下一個節點"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "中序（infix）運算式 A+B×C+D×E 之後序（postfix）的表示式為何？（註：×的優先順序大於+）",
   "o": [
    "ABC×+DE×+",
    "AB+C×DE×+",
    "++A×BC×DE",
    "×+×+ABCD×E"
   ],
   "a": 0
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "已知堆疊（STACK）初始內容為<g, h>，堆疊頂端（top）指向 g，如果經一連串的動作，pop(), push(b), push(k),push(m), pop()，最後堆疊由頂端至底端內容為：",
   "o": [
    "<b, k, m>",
    "<k, b, h>",
    "<g, b, k>",
    "<k, b, g>"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "Microsoft Excel 軟體中，COUNT 內建函數所代表之意義為何？",
   "o": [
    "計算含有數字儲存格的加總值",
    "計算含有數字儲存格的平均值",
    "計算含有數字儲存格的最大值",
    "計算含有數字儲存格的數量"
   ],
   "a": 3
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "在真實的世界中，加入虛擬的影像，是使用下列那一種技術？",
   "o": [
    "虛擬實境（Virtual Reality）",
    "擴增實境（Augmented Reality）",
    "擴增虛擬（Augmented Virtuality）",
    "真實環境（Real Environment）"
   ],
   "a": 1
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "死結（deadlock）是作業系統在安排行程（process）時需避免的情況。關於死結的必要條件及其敘述，下列何者錯誤？",
   "o": [
    "互斥（mutual exclusion）：各行程使用的資源互不相同",
    "占用並等候（hold and wait）：行程占用部分資源並等候其它行程所占用的資源",
    "不可搶先（no preemption）：作業系統不可將資源暫時改派給其它行程，行程可持續占用資源直到自願釋放為止",
    "循環等待（circular waiting）：所有行程與資源指派關係形成一個迴路"
   ],
   "a": 0
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列那一個通訊協定和其它協定屬於不同層級（layer）？",
   "o": [
    "File Transfer Protocol（FTP）",
    "Hyper-Text Transfer Protocol（HTTP）",
    "Transmission Control Protocol（TCP）",
    "Dynamic Host Configuration Protocol（DHCP）"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "行動電話本身具備可移動性，在通話過程中，行動電話從一個目前正在使用的基地台頻道轉換到鄰近基地台的另一個可以使用的頻道，以維持通信持續，此動作稱為：",
   "o": [
    "路由（routing）",
    "交遞（handoff）",
    "氾濫訊號量（flooding）",
    "交換（switch）"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "將兩個 8 位元 2 進位資料 11001001 與 01001000 作 XOR 運算後，以 16 進位制表示應為：",
   "o": [
    "C9",
    "B7",
    "81",
    "48"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列何種技術是運用統計及人工智慧，幫忙分析人員發掘隱藏於企業的趨勢、環境、資料特徵等？",
   "o": [
    "資料隱藏（Data Hiding）",
    "資料採礦（Data Mining）",
    "決策支援系統（Decision Support System）",
    "專家系統（Expert System）"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "請問 IP 位址 200.108.5.115 是屬於那一等級的網路？",
   "o": [
    "Class A",
    "Class B",
    "Class C",
    "Class D"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "現在常用的 USB 是一個符合單一標準開發出的串列擴充介面，它可以讓使用者在電腦上最多附加多少個設備？",
   "o": [
    "127",
    "128",
    "129",
    "130"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "當整個文件的大小超過記憶體的容量時，採取只將程式和資料的基本部分載入記憶體的技術是：",
   "o": [
    "swapping",
    "switching",
    "suppressing",
    "spamming"
   ],
   "a": 0
  },
  {
   "n": 41,
   "pt": 1,
   "type": "single",
   "q": "請問下列何者不是網際網路瀏覽器（browser）？",
   "o": [
    "Microsoft Internet Explorer",
    "Apple iTunes",
    "Google Chrome",
    "Netscape Navigator"
   ],
   "a": 1
  },
  {
   "n": 42,
   "pt": 1,
   "type": "single",
   "q": "當我們把下圖轉換為關聯表綱要時，關聯表綱要至少共有幾個屬性？empLName ＿＿＿ empFNameempAddressempName ＿＿＿ empBirthdayempID ＿＿＿ EMPLOYEEempSalary ＿＿＿ empAgeempSex",
   "o": [
    "9",
    "7",
    "8",
    "6"
   ],
   "a": 1
  },
  {
   "n": 43,
   "pt": 1,
   "type": "single",
   "q": "請問會因違反下列何種限制條件（constraint）在刪除一筆序列值時，而可能引發連鎖刪除（cascading deletion）？",
   "o": [
    "值域（domain）限制",
    "主鍵（primary key）限制",
    "參考完整限制（referential integrity constraint）",
    "語意完整限制（semantic integrity constraint）"
   ],
   "a": 2
  },
  {
   "n": 44,
   "pt": 1,
   "type": "single",
   "q": "病毒（virus）是一種在你不知道的時候載入你的電腦，並在未經許可下運行的寄生程式。請問自我複製直到全部硬碟塞滿的病毒是屬於那種病毒類型？",
   "o": [
    "開機型病毒（Boot strap sector virus）",
    "檔案型病毒（File infector virus）",
    "特洛伊木馬（Trojan horse）",
    "蠕蟲（Worm）"
   ],
   "a": 3
  },
  {
   "n": 45,
   "pt": 1,
   "type": "single",
   "q": "用在新聞伺服器和新聞讀者的協定是：",
   "o": [
    "HTTP",
    "NNTP",
    "TELNET",
    "FTP"
   ],
   "a": 1
  },
  {
   "n": 46,
   "pt": 1,
   "type": "single",
   "q": "關於 WiFi 的描述，下列何者正確？",
   "o": [
    "是 Wireless File 的縮寫",
    "傳輸距離可以拉長至 50 公里",
    "比 Wimax 有更大的頻寬",
    "是無線傳輸技術，標準為 802.11b, 802.11a 和 802.11g"
   ],
   "a": 3
  },
  {
   "n": 47,
   "pt": 1,
   "type": "single",
   "q": "請問何種網路設備是用來篩選封包，以決定特定的封包是屬於本地網路或是別的區域網路，再將封包傳送至合適的區域網路？",
   "o": [
    "中繼器（repeater）",
    "橋接器（bridge）",
    "交換器（switch）",
    "協定轉換器（gateway）"
   ],
   "a": 1
  },
  {
   "n": 48,
   "pt": 1,
   "type": "single",
   "q": "「集體議價」是屬於那一種電子商務類型？",
   "o": [
    "B to B",
    "B to C",
    "C to B",
    "C to C"
   ],
   "a": 2
  },
  {
   "n": 49,
   "pt": 1,
   "type": "single",
   "q": "在所有作品（文字、影片、影像、音樂、程式）完成時即受到保護，他人不得任意引用，是屬於數位著作相關的那一種資訊權？",
   "o": [
    "著作權",
    "商標權",
    "公開權",
    "隱私權"
   ],
   "a": 0
  },
  {
   "n": 50,
   "pt": 1,
   "type": "single",
   "q": "關於 OSI（Open System Interconnection）的七層架構圖，請問負責建立、維護與切斷連線、對話控制、資料交換管理工作的是那一層？",
   "o": [
    "網路層（Network Layer）",
    "資料鏈結層（Data Link Layer）",
    "傳輸層（Transport Layer）",
    "會議層（Session Layer）"
   ],
   "a": 3
  }
 ]
};

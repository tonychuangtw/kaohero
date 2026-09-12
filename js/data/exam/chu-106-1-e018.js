/* 106 年　初等考試　資料處理大意（50 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['chu-106-1-e018'] = {
 "id": "chu-106-1-e018",
 "cat": "civil",
 "exam": "chu",
 "stage": 1,
 "roc": 106,
 "nth": 1,
 "code": "106010",
 "subj": "e018",
 "title": "106 年　初等考試　資料處理大意",
 "subjName": "資料處理大意",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "關於電子商務的安全需求，下列敘述何者錯誤？",
   "o": [
    "若在傳遞過程中資料已經被修改，則此資料已經不具有代表性",
    "資料在網路上傳輸，可能會被盜用",
    "交易兩端間的資料需要驗證",
    "不可否認性是代表資料不能外洩"
   ],
   "a": 3
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於被動式攻擊（Passive attacks）？",
   "o": [
    "竊聽（eavesdropping）",
    "傳送假的訊息",
    "篡改傳送的封包資料",
    "DDOS"
   ],
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "在建置資訊安全政策和架構時，必須考慮資訊安全三要素。下列何者不是資訊安全三要素之一？",
   "o": [
    "資訊的機密性（Confidentiality）",
    "資訊的完整性（Integrity）",
    "資訊的可用性（Availability）",
    "資訊的易用性（Accessibility）"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列對網路行銷定價策略的描述，何者錯誤？",
   "o": [
    "網路行銷的定價模式是由企業主導",
    "網路行銷的撮合，是由買方在網路訂價，再透過網站找尋適當的賣家",
    "網路行銷的向上議價，讓顧客在網路上競標，由價高者得標",
    "網路行銷的向下議價，整合對產品有興趣的買家，利用群體力量來獲得優惠價格，隨著人數增加，價格將會按比例下降"
   ],
   "a": 0
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 C2C 的定義？",
   "o": [
    "將大量的個人買方和賣方聯繫起來，以進行商品的線上交易",
    "競標網站、拍賣網站或 BBS 留言板等都是可能的管道與模式",
    "買賣雙方，只有買方是網路消費者",
    "利用部落格（Blog）、推特（Twitter）或論壇等分享機制，來銷售自己的知識、經驗與能力，也屬於C2C"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於無線個人網路（WPAN）？",
   "o": [
    "藍芽（Bluetooth）",
    "超寬頻（Ultra Wide Band, UWB）",
    "Wi-Fi",
    "ZigBee"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "如果因為需求改變，需要將資料表 A 修訂增加一個新欄位 F，其欄位定義為 CHAR(8)，下列 SQL 敘述何者正確？",
   "o": [
    "ALTER TABLE A ADD COLUMN F CHAR(8)",
    "CHANGE TABLE A ADD FIELD F CHAR(8)",
    "MODIFY TABLE A ADD COLUMN F CHAR(8)",
    "REVISE TABLE A ADD FIELD F CHAR(8)"
   ],
   "a": 0
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "無線射頻辨識系統（RFID）不包括下列何種裝置？",
   "o": [
    "電子標籤",
    "天線",
    "頻譜儀",
    "讀取器"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者通訊協定不是用於電子郵件傳輸？",
   "o": [
    "POP3",
    "SMTP",
    "SNMP",
    "IMAP"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "會員資料表 MEMBER 的主鍵（primary key）為 eid、另外兩欄位為 name 及 addr，電話資料表 PHONE 的主鍵（primary key）由 hid 及 pno 兩欄位組合構成，hid 參考到 MEMBER 的 eid。其中 name 代表姓名、addr 代表住址、pno 代表電話。列出所有會員的姓名與電話（其他欄位不列）的 SQL 敘述為何？",
   "o": [
    "SELECT name, pno FROM MEMBER, PHONE WHERE eid = hid",
    "SELECT MEMBER.name, PHONE.pno WHERE eid = hid",
    "SELECT MEMBER.name, PHONE.pno FROM TABLE WHERE MEMBER.eid =PHONE.hid",
    "SELECT name, pno FROM TABLE where MEMBER.eid=PHONE.hid"
   ],
   "a": 0
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "某關聯（relation）共有 6 個屬性（attribute），目前有 4 個值組（tuple），其中一個值組有一個屬性內容為空值（NULL）。請問該關聯的維度（degree）為何？",
   "o": [
    "4",
    "5",
    "6",
    "24"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列關於正規式（normal form, NF）的敘述，何者錯誤？",
   "o": [
    "若關聯式資料表 A 符合 BCNF，則 A 符合第三正規式（3NF）",
    "關聯式資料表 A 必符合第一正規式（1NF）",
    "若關聯式資料表 A 符合第二正規式（2NF），則 A 沒有遞移相依（transitive dependency）問題",
    "若關聯式資料表 A 符合第三正規式（3NF），則 A 沒有部分相依（partial dependency）問題"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "將下列的實體關聯圖（ER diagram），對應產生關聯式資料表，最少有幾個表？A1 A2 A3 B1 B21 NS R T",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列關於電腦容量單位的描述，何者錯誤？",
   "o": [
    "TB > GB",
    "PB > TB",
    "EB > GB",
    "GB > PB"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "作業系統必須要有下列何者機制，才能支援多人共用一部電腦？",
   "o": [
    "多核（multi-core）",
    "多執行緒（multi-thread）",
    "多工（multi-tasking）",
    "全雙工（full-duplex）"
   ],
   "a": 2
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "具有三個分頁框（page frame）的記憶體分頁管理，若頁參考字串（page reference string）為 701201027，採最佳替換（optimal replacement）策略，經過前三次頁面失誤（page fault）後，接下來的 page fault 會換掉那一頁面？",
   "o": [
    "頁面 0",
    "頁面 1",
    "頁面 2",
    "頁面 7"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "在 Microsoft Windows 作業系統中，要查看網路封包傳送到某一節點的路徑，其指令為何？",
   "o": [
    "tracert",
    "ipconfig",
    "netstat",
    "ping"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "在 Linux 作業系統中，要列出目錄（或者稱資料夾）的內容，其指令為何？",
   "o": [
    "ls -l",
    "dir",
    "cat *.*",
    "show -dir"
   ],
   "a": 0
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "傳統電腦在 CPU 與記憶體中間，會有什麼設計來加快運算速度？",
   "o": [
    "暫存器（register）",
    "虛擬記憶體（virtual memory）",
    "快閃記憶體（flash memory）",
    "快取記憶體（cache memory）"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "某個以列為主（row-major）儲存的二維陣列 A[0..5][0..7]，若 A[1][5]的位址是 100010，A[2][6]的位址是103610，則 A[4][3]的位址是下列何者？",
   "o": [
    "1066",
    "1072",
    "1076",
    "1088"
   ],
   "a": 3
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "給一個空堆疊(stack)S，經過下列連串動作：PUSH(S,1)、PUSH(S,2)、PUSH(S,3)、PUSH(S,4)、PUSH(S,4)、POP(S)、POP(S)、POP(S)、PUSH(S,3)之後，堆疊頂端的值為何？",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "Java 語言屬於下列那一種程式語言？",
   "o": [
    "物件導向語言（object-oriented language）",
    "程序式語言（procedural language）",
    "函數式語言（functional language）",
    "多平台式語言（multi-platform language）"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列敘述何者錯誤？",
   "o": [
    "組合語言程式中也有變數及常數",
    "如果某變數在程式執行中都不改變值的話，可以宣告為常數",
    "變數可以設定為某個常數",
    "常數可以設定為某個變數"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列採用二補數（2’s complement）表示法中，那個代表最小的整數值？",
   "o": [
    "11111111",
    "10000000",
    "00000000",
    "01111111"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "101010102、0638 與 9916 分別表示 2 進制、8 進制與 16 進制之數值，若 101010102 與 0638 進行邏輯運算（logic operation）的結果是 9916，下列何者為其運算子？",
   "o": [
    "NOT",
    "AND",
    "OR",
    "XOR"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 1,
   "needfig": true,
   "fig": "img/q/106010_508_0701_26.webp"
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "一個控制 Bus 由 8 條線所組成，至多可以定址的範圍為何？",
   "o": [
    "8",
    "32",
    "128",
    "256"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "在一台電腦上要執行一個程式指令的三個步驟依序為何？",
   "o": [
    "Fetch, execute, and decode",
    "Fetch, decode, and execute",
    "Decode, fetch, and execute",
    "Decode, execute, and fetch"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "在電腦系統中，當有一個大的資料區塊要從輸入/輸出（I/O）裝置直接搬移到記憶體，一般會使用什麼方法來進行 CPU 與 I/O 的同步操作？",
   "o": [
    "Programmed I/O",
    "Interrupt-driven I/O",
    "DMA（Direct Memory Access）",
    "Isolated I/O"
   ],
   "a": 2
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "物件導向程式設計可允許多個函數使用相同函數名稱，但各自使用不同參數（不同的參數順序、個數或資料型態）。請問這樣的設計為下列那種特性？",
   "o": [
    "虛擬（Virtual）",
    "繼承（Inheritance）",
    "封裝（Encapsulation）",
    "多載（Overloading）"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "在程式語言中為了將困難的問題簡單化，會在原本的函數（Function）中，透過參數的簡化，再呼叫原本的函數來解決問題，這是什麼方法？",
   "o": [
    "Recursion",
    "Iteration",
    "Sorting",
    "Searching"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "在軟體工程之中，兩個程式模組（Module）要最大化那個項目來表示這二個模組的高關聯性？",
   "o": [
    "Modularity",
    "Interoperability",
    "Cohesion",
    "Coupling"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "在程式語言中，在呼叫函數（Function）時的參數傳遞有傳值呼叫（Call by value）及傳參考呼叫（Call byreference），下列那項說明是正確的？",
   "o": [
    "傳值呼叫不可以修改函數內的值，傳參考呼叫可以修改函數內的值",
    "傳值呼叫可以修改函數內的值，傳參考呼叫不可以修改函數內的值",
    "傳值呼叫不可以修改函數內的值，傳參考呼叫不可以修改函數內的值",
    "傳值呼叫可以修改函數內的值，傳參考呼叫可以修改函數內的值"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "現今主要的資料庫系統以什麼樣的模型（Model）最為普遍？",
   "o": [
    "Linked list",
    "Relational",
    "Network",
    "Hierarchical"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "使用何種資料安全機制，傳送者及接收者需要進行金鑰交換？",
   "o": [
    "Firewall",
    "Intrusion detection system",
    "Access control list",
    "Internet protocol security（IPsec）"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "在網路的資料鏈結層（Data link layer）中，它最基本的資料傳送單位是什麼？",
   "o": [
    "Bit",
    "Bit string",
    "Data frame",
    "Message"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "在那一種網路的連接拓樸（Topology）下，可能會有隱藏節點（Hidden node）的狀況發生？",
   "o": [
    "Star topology",
    "Bus topology",
    "Ring topology",
    "Ad hoc"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "利用偽造的 email 或是網站去偷竊他人的個人資料，這種行為是違反資訊倫理的那項議題？",
   "o": [
    "資訊安全",
    "使用權",
    "著作權",
    "隱私權"
   ],
   "a": 3
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "使用大數據（Big data）分析，可以從龐大的資料中找尋出有用的資料加以利用。下列的描述何者不是大數據分析的特性？",
   "o": [
    "使用隨機抽樣的觀念",
    "接受資料是不完美、不精確",
    "解決人工智慧中難以用數學方法精確描述的、隱喻的複雜問題",
    "能接受精確度有瑕疵的預測"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "雲端計算是將許多的軟硬體資源進行結合，將其運算能力提供出來作為一種服務，企業或個人可以透過網路，讓網路上不同的電腦同時幫你進行運算，大幅增進資料處理的速度。下列何者是提升雲端計算有效使用硬體資源的關鍵技術？",
   "o": [
    "行動運算技術",
    "虛擬化技術",
    "省電技術",
    "資料分析技術"
   ],
   "a": 1
  },
  {
   "n": 41,
   "pt": 1,
   "type": "single",
   "q": "NoSQL 是不同於傳統資料庫管理系統的統稱，其資料存儲可以不需要固定的表格模式，也經常會避免使用 SQL 的 JOIN 操作，一般有水平可延伸性的特徵。下列何者為 NoSQL 的特性？",
   "o": [
    "使用 SQL 作為查詢語言",
    "可以利用多個表格中的關係來進行資料查詢",
    "可以處理非結構化/半結構化的大數據",
    "方便處理固定格式的資料"
   ],
   "a": 2
  },
  {
   "n": 42,
   "pt": 1,
   "type": "single",
   "q": "下列的通訊協定中，何者是被使用於蜂巢式網路（Cellular Network）？",
   "o": [
    "Ethernet",
    "NFC",
    "Bluetooth",
    "LTE-A"
   ],
   "a": 3
  },
  {
   "n": 43,
   "pt": 1,
   "type": "single",
   "q": "由美國電機電子工程師協會（IEEE）所制訂的 IEEE 802.11x 通訊協定，就是下列的那一種無線區域網路服務？",
   "o": [
    "WiMAX",
    "Wi-Fi",
    "ZigBee",
    "LTE-A"
   ],
   "a": 1
  },
  {
   "n": 44,
   "pt": 1,
   "type": "single",
   "q": "浮點數的資料表示可以區分成三個部分，請問下列那一項並不包含在內？",
   "o": [
    "小數（Mantissa）",
    "正負號位元（Signed bit）",
    "偏移指數（Biased exponent）",
    "最高有效位元（Most significant bit）"
   ],
   "a": 3
  },
  {
   "n": 45,
   "pt": 1,
   "type": "single",
   "q": "請問下列程式中，printf( “\\n” )總共執行幾次？for (i=1; i<=4; i++){ for (j=1; j<5; j++)printf( “*” );printf( “\\n” );}",
   "o": [
    "5",
    "4",
    "20",
    "1"
   ],
   "a": 1
  },
  {
   "n": 46,
   "pt": 1,
   "type": "single",
   "q": "下列工作中，何者不屬於作業系統負責處理的工作？",
   "o": [
    "資料庫管理",
    "CPU 排程管理",
    "記憶體管理",
    "檔案系統管理"
   ],
   "a": 0
  },
  {
   "n": 47,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 1,
   "needfig": true,
   "fig": "img/q/106010_508_0701_47.webp"
  },
  {
   "n": 48,
   "pt": 1,
   "type": "single",
   "q": "管線（Pipeline）有三大危障（Hazard），下列何者不是管線的危障？",
   "o": [
    "結構危障（Structural hazard）",
    "資料危障（Data hazard）",
    "衝突危障（Conflict hazard）",
    "控制危障（Control hazard）"
   ],
   "a": 2
  },
  {
   "n": 49,
   "pt": 1,
   "type": "single",
   "q": "在 32 位元的電腦中，使用 C 語言宣告一個字元指標“char *c”，請問指標 c 在記憶體中占有幾個 byte 的空間？",
   "o": [
    "1",
    "2",
    "4",
    "8"
   ],
   "a": 2
  },
  {
   "n": 50,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是電子試算表軟體的主要功能？",
   "o": [
    "分析、管理資料",
    "編製統計圖表",
    "編輯、計算資料",
    "處理影像、圖片"
   ],
   "a": 3
  }
 ]
};

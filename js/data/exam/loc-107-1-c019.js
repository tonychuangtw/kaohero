/* 107 年　五等　資料處理大意（50 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-107-1-c019'] = {
 "id": "loc-107-1-c019",
 "cat": "civil",
 "exam": "local",
 "stage": 3,
 "roc": 107,
 "nth": 1,
 "code": "107190",
 "subj": "c019",
 "title": "107 年　五等　資料處理大意",
 "subjName": "資料處理大意",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "關於 SSL 敘述，下列何者錯誤？",
   "o": [
    "在電子商務應用中，一般消費者並沒有憑證，因此無法利用 SSL 對商家做使用者認證",
    "SSL 可提供資料的隱私性",
    "SSL 是採用公開金鑰加密演算法，達到資料完整性（data integrity）保護",
    "採用 SSL 的網站，並不代表該網站應用程式之安全"
   ],
   "a": 2,
   "exp": "✅ (C) 此項錯誤：SSL 的資料完整性靠訊息驗證碼（MAC／雜湊）達成，公開金鑰僅用於身分驗證與金鑰交換。\n❌ (A) 敘述正確，一般消費者無憑證，故無法以 SSL 對其做使用者認證。\n❌ (B) 敘述正確，SSL 以對稱式加密提供隱私性。\n❌ (D) 敘述正確，傳輸加密不等於網站應用程式安全。\n📚 出處：SSL/TLS 的安全服務。"
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "電子商務需要安全服務，下列敘述何者錯誤？",
   "o": [
    "消費者與商家雙方應做到相互認證（mutual authentication）",
    "消費者與商家雙方應做到不可否認性（non-repudiation）",
    "電商平台利用 TLS/SSL 只能確保資料傳輸之安全性",
    "消費者信用卡付款資訊，商家無法看到，只有雙方的信用卡公司才可以看到"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：在 SSL/TLS 架構下商家看得到信用卡資訊；使卡號對商家隱藏的是 SET 協定。\n❌ (A) 敘述正確，雙方應相互認證。\n❌ (B) 敘述正確，交易應具不可否認性。\n❌ (C) 敘述正確，TLS/SSL 只保障傳輸過程的安全。\n📚 出處：電子商務的安全需求；SSL 與 SET 的比較。"
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "關於非對稱式加密（Asymmetric cryptography）的敘述，下列何者錯誤？",
   "o": [
    "非對稱式加密可以做到使用者認證的功能",
    "非對稱式加密比對稱式加密安全",
    "非對稱式加密可以提供金鑰管理之功能",
    "非對稱式加密可以提供數位簽章的功能"
   ],
   "a": 1,
   "exp": "✅ (B) 此項錯誤：安全性取決於金鑰長度與演算法設計，非對稱式加密在相同安全強度下速度慢，並非必然較安全。\n❌ (A) 敘述正確，可用於使用者認證。\n❌ (C) 敘述正確，可解決金鑰分配與管理的問題。\n❌ (D) 敘述正確，數位簽章即建立於非對稱式加密。\n📚 出處：對稱式與非對稱式加密的比較。"
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "有關資料結構堆疊（stack）的敘述，下列何者錯誤？",
   "o": [
    "堆疊是以先進後出（first in last out）的方式存取",
    "堆疊存取只需要一個指標，即可做管理",
    "程式呼叫函數的關係可用堆疊表示",
    "堆疊無法用連結串列（link list）方式表示"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：堆疊可以用連結串列實作，並不限於陣列。\n❌ (A) 敘述正確，堆疊為先進後出。\n❌ (B) 敘述正確，僅需一個 top 指標即可管理。\n❌ (C) 敘述正確，函數呼叫關係以呼叫堆疊表示。\n📚 出處：堆疊的性質與實作。"
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "有關資料結構連結串列（link list）與陣列（array）的敘述，下列何者錯誤？",
   "o": [
    "連結串列可以動態產生，因此不需要事前定義其大小；陣列需要事前宣告大小",
    "連結串列的存取時間比陣列久",
    "陣列可以直接存取任何一個元素，但連結串列不行",
    "連結串列因為還需要記錄連結指標（pointer），在記憶體中，連結串列（link list）所需的空間比陣列大"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：陣列須事先宣告固定大小而常有未使用的空間，整體記憶體用量未必小於連結串列。\n❌ (A) 敘述正確，串列可動態產生，陣列須事先宣告。\n❌ (B) 敘述正確，串列須循序走訪，存取較慢。\n❌ (C) 敘述正確，陣列可隨機存取，串列不行。\n📚 出處：陣列與連結串列的比較。"
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "有關變數的敘述，下列何者錯誤？",
   "o": [
    "在一個程式中宣告全域變數，所有在這個程式中的函數或是副程式都可以存取到該全域變數",
    "在主函數中宣告的變數都是全域變數",
    "函數內可以有與全域變數相同名稱的區域變數",
    "相同名稱的區域變數不會更動到與它同名稱的全域變數內容"
   ],
   "a": 1,
   "exp": "✅ (B) 此項錯誤：在主函數（main）中宣告的變數為該函數的區域變數，而非全域變數。\n❌ (A) 敘述正確，全域變數可被程式中各函數存取。\n❌ (C) 敘述正確，區域變數得與全域變數同名。\n❌ (D) 敘述正確，同名的區域變數會遮蔽全域變數而不改動其內容。\n📚 出處：變數的有效範圍。"
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "有關作業系統的敘述，下列何者錯誤？",
   "o": [
    "作業系統是介在硬體與使用者之間的軟體",
    "作業系統可視為一個 interrupt driven 的軟體系統",
    "作業系統可視為管理與分配資源的軟體系統",
    "一個作業系統可在各種不同的硬體規格的設備上執行"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：作業系統須針對特定硬體架構移植與編譯，無法在各種硬體規格上直接執行。\n❌ (A) 敘述正確，作業系統介於硬體與使用者之間。\n❌ (B) 敘述正確，作業系統為中斷驅動的系統。\n❌ (C) 敘述正確，作業系統負責資源管理與分配。\n📚 出處：作業系統的定義與功能。"
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "有關作業系統提供使用者介面（user interface）的敘述，下列何者正確？",
   "o": [
    "一個作業系統可以提供多種使用者介面",
    "使用者無需了解作業系統所提供的命令，即可使用命令列介面",
    "命令列介面執行效能比圖形介面佳",
    "需要在管理者權限才可執行命令列介面"
   ],
   "a": 0,
   "exp": "✅ (A) 同一作業系統可同時提供命令列與圖形使用者介面。\n❌ (B) 使用命令列介面須知悉可用的命令。\n❌ (C) 效能取決於所執行的工作，非介面型式本身。\n❌ (D) 一般使用者權限即可執行命令列介面。\n📚 出處：作業系統的使用者介面。"
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "有關 TCP/IP 通訊協定的敘述，下列何者錯誤？",
   "o": [
    "TCP 連線都是連結導向（connection oriented）通訊",
    "UDP 連線都是無連結導向（connectionless oriented）通訊",
    "UDP 連線的 overhead 比 TCP 小",
    "DNS 是採用連結導向通訊"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：DNS 查詢主要使用 UDP，屬無連結導向。\n❌ (A) 敘述正確，TCP 為連結導向。\n❌ (B) 敘述正確，UDP 為無連結導向。\n❌ (C) 敘述正確，UDP 標頭較小、額外負擔較低。\n📚 出處：TCP 與 UDP 的比較。"
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "有關網際網路通訊協定的敘述，下列何者錯誤？",
   "o": [
    "ARP 是 MAC/IP 住址對應（address mapping）的通訊協定",
    "DNS 是 IP 與網域名稱對應的通訊協定",
    "DNS 是透過 UDP 通訊協定傳送封包",
    "ARP 是透過 UDP 通訊協定傳送封包"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：ARP 封包直接封裝於乙太網路訊框中，不經 UDP 或 IP。\n❌ (A) 敘述正確，ARP 負責 IP 與 MAC 位址的對應。\n❌ (B) 敘述正確，DNS 負責網域名稱與 IP 的對應。\n❌ (C) 敘述正確，DNS 主要以 UDP 傳送。\n📚 出處：ARP 與 DNS 的運作層級。"
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "有關網際網路通訊協定的敘述，下列何者錯誤？",
   "o": [
    "除了實體層外，其他通訊層的協定都有標頭（header）",
    "第二層為資料連結層（data link layer），只能在區域網路傳送",
    "客戶與伺服器溝通模式（Client and server communication model）的應用程式是在 IP 層做通訊",
    "TCP 與 UDP 通訊協定採用網路插座（network socket）方式做連結。"
   ],
   "a": 2,
   "exp": "✅ (C) 此項錯誤：主從式應用程式的通訊在應用層，IP 層只負責位址與路由。\n❌ (A) 敘述正確，實體層傳送的是位元訊號，無標頭。\n❌ (B) 敘述正確，資料連結層的訊框只在同一區域網路內傳送。\n❌ (D) 敘述正確，TCP 與 UDP 以 socket 建立端點。\n📚 出處：TCP/IP 的分層架構。"
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "有關作業系統中的系統呼叫（system call），下列何者錯誤？",
   "o": [
    "系統呼叫是作業系統提供給使用者的一種介面",
    "作業系統是在 kernel mode 下執行系統呼叫",
    "作業系統利用雙模式（duel mode）方式保護系統不會因應用程式不當執行影響其他使用者",
    "應用程式是在 kernel mode 下，呼叫系統呼叫"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：應用程式在 user mode 發出系統呼叫，經陷阱切換為 kernel mode 後才由核心執行。\n❌ (A) 敘述正確，系統呼叫是核心對使用者程式提供的介面。\n❌ (B) 敘述正確，系統呼叫的實際執行在 kernel mode。\n❌ (C) 敘述正確，雙模式機制用以保護系統。\n📚 出處：系統呼叫與雙模式運作。"
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "雙連結串列（doubly linked list）資料結構宣告如下。若需要刪除節點 curNode，且該節點為串列中間的某一個節點，非第一個或最後一個節點，下列何者是刪除該節點的程式碼？#include<stdio.h>#include<stdlib.h>struct Node {int data;struct Node* next;struct Node* prev;};struct Node* head; // global variable - pointer to head node//Creates a new Node and returns pointer to it.struct Node* GetNewNode(int x){struct Node* newNode=(struct Node*)malloc(sizeof(struct Node));newNode->data = x;newNode->prev = NULL;newNode->next = NULL;return newNode;}",
   "o": [
    "curNode->prev->next = curNode->next;",
    "curNode->prev->prev = curNode->prev;curNode->next->prev = curNode->prev; ＿＿＿ curNode->next->next = curNode->next;",
    "curNode->prev->next = curNode->prev;",
    "curNode->next->next = curNode->next;curNode->next->prev = curNode->next; ＿＿＿ curNode->prev->prev = curNode->prev;"
   ],
   "a": 0,
   "exp": "✅ (A) 刪除中間節點須將前一節點的 next 指向後一節點，本選項即為其中正確的一行。\n❌ (B) 其中 curNode->prev->prev 與 curNode->next->next 的改寫會破壞前後節點的連結。\n❌ (C) 將前一節點的 next 指回自己的 prev，形成錯誤連結。\n❌ (D) 改寫 next->next 與 prev->prev 同樣破壞串列結構。\n📚 出處：雙向連結串列的刪除操作。"
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "有關整數表示法的敘述，下列何者正確？",
   "o": [
    "16 位元不帶號整數（Unsigned integer）最大值為 65536",
    "以 2’s 補數法表示的 16 位元整數最大值為 32768",
    "以 1’s 補數法表示的整數有兩個 0 的表示法",
    "1’s 補數法負數的表示是將 2’s 補數法求得的值再加 1"
   ],
   "a": 2,
   "exp": "✅ (C) 1 補數法有 +0 與 －0 兩種表示法。\n❌ (A) 16 位元不帶號整數的最大值為 65535。\n❌ (B) 2 補數法 16 位元整數的最大值為 32767。\n❌ (D) 關係相反：2 補數是 1 補數再加 1。\n📚 出處：整數的機器表示法。"
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列何者非硬碟傳輸介面？",
   "o": [
    "IDE",
    "SATA",
    "SCSI",
    "PCI"
   ],
   "a": 3,
   "exp": "✅ (D) PCI 為主機板的擴充匯流排介面，非硬碟傳輸介面。\n❌ (A) IDE 為早期的硬碟介面。\n❌ (B) SATA 為現行常用的硬碟介面。\n❌ (C) SCSI 常用於伺服器的硬碟介面。\n📚 出處：儲存裝置的傳輸介面。"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "有關行程狀態（process state）的敘述，下列何者錯誤？",
   "o": [
    "行程在等待輸出入時，其狀態從執行（running）轉到等待（waiting）",
    "在執行狀態的行程可能因中斷而變成就緒（ready）狀態",
    "在等待狀態的行程可能因中斷而變成結束狀態",
    "在就緒狀態的行程都是可以執行的行程"
   ],
   "a": 2,
   "exp": "✅ (C) 此項錯誤：等待中的行程於事件完成後轉為就緒，不會因中斷直接變成結束狀態。\n❌ (A) 敘述正確，等待 I/O 時由執行轉為等待。\n❌ (B) 敘述正確，時間片用盡等中斷會使執行轉為就緒。\n❌ (D) 敘述正確，就緒狀態的行程隨時可被排程執行。\n📚 出處：行程狀態轉換圖。"
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "有關行程（process）排程演算法，下列何者錯誤？",
   "o": [
    "最短工作優先排程法（shortest job first）屬於非搶奪式（non-preemptive）排程演算法",
    "最短剩餘工作優先排程法（shortest remaing time first）屬於搶奪式（preemptive）排程演算法",
    "優先排程法（priority scheduling）為最佳排程演算法",
    "循環分配（round robin）排程法可達到公平分配，適合多工（multi-tasking）系統"
   ],
   "a": 2,
   "exp": "✅ (C) 此項錯誤：優先排程法可能造成低優先行程飢餓，並非最佳排程演算法。\n❌ (A) 敘述正確，SJF 為非搶奪式。\n❌ (B) 敘述正確，SRTF 為搶奪式。\n❌ (D) 敘述正確，Round Robin 公平且適合多工系統。\n📚 出處：CPU 排程演算法。"
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "有關雲端運算（cloud computing）的敘述，下列何者錯誤？",
   "o": [
    "雲端運算是一種分散式運算環境",
    "雲端運算合適分析大量資料",
    "雲端運算需使用大量網路頻寬",
    "雲端運算需使用虛擬主機技術，因此增加額外成本（overhead），因此其運算執行效能比一台主機要差"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：雲端以大量節點平行處理，整體運算效能通常遠優於單一主機。\n❌ (A) 敘述正確，雲端運算屬分散式運算環境。\n❌ (B) 敘述正確，適合大量資料的分析。\n❌ (C) 敘述正確，需仰賴充足的網路頻寬。\n📚 出處：雲端運算的特性。"
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "依據美國國家標準和技術研究院（NIST）所定義的雲端運算（cloud computing）服務模式，下列那一種不是雲端運算的服務模式？",
   "o": [
    "平台即服務（PaaS）",
    "軟體即服務（SaaS）",
    "基礎設施即服務（IaaS）",
    "資料庫即服務（DaaS）"
   ],
   "a": 3,
   "exp": "✅ (D) NIST 定義的服務模式為 SaaS、PaaS、IaaS 三種，不含 DaaS。\n❌ (A) PaaS 為三種模式之一。\n❌ (B) SaaS 為三種模式之一。\n❌ (C) IaaS 為三種模式之一。\n📚 出處：NIST SP 800-145。"
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是個人電腦的主機板應有的基本元件？",
   "o": [
    "南橋晶片",
    "記憶體",
    "硬碟機",
    "CPU"
   ],
   "a": 2,
   "exp": "✅ (C) 硬碟機為外接於主機板的儲存裝置，非主機板本身的元件。\n❌ (A) 南橋晶片位於主機板上。\n❌ (B) 記憶體插槽與模組屬主機板的基本配置。\n❌ (D) CPU 安裝於主機板的插槽上。\n📚 出處：個人電腦主機板的組成。"
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是企業電子化所需的資訊系統？",
   "o": [
    "CRM（Customer Relationship Management）",
    "DSS（Decision Support System）",
    "SDLC（System Development Life Cycle）",
    "SCM（Supply Chain Management）"
   ],
   "a": 2,
   "exp": "✅ (C) SDLC 是系統開發的流程方法論，並非一套資訊系統。\n❌ (A) CRM 為顧客關係管理系統。\n❌ (B) DSS 為決策支援系統。\n❌ (D) SCM 為供應鏈管理系統。\n📚 出處：企業電子化的資訊系統。"
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "無線傳輸技術不同，其傳輸的範圍也會有差異。針對 WMAN、WLAN、WPAN 的傳輸範圍，下列何者正確？",
   "o": [
    "WMAN > WLAN > WPAN",
    "WLAN > WMAN > WPAN",
    "WPAN > WLAN > WMAN",
    "WMAN > WPAN > WLAN"
   ],
   "a": 0,
   "exp": "✅ (A) 涵蓋範圍由大而小依序為 WMAN（都會網路）＞WLAN（區域網路）＞WPAN（個人網路）。\n❌ (B) WLAN 的範圍小於 WMAN。\n❌ (C) 順序完全相反。\n❌ (D) WPAN 的範圍最小，不應大於 WLAN。\n📚 出處：無線網路的分類。"
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "資料庫的 SQL 語法中有一個名為‟DROP TABLE”的語法，其作用為何？",
   "o": [
    "新增一筆資料到資料表",
    "從資料表刪除一筆資料",
    "從資料表刪除所有的資料",
    "刪除資料表的定義"
   ],
   "a": 3,
   "exp": "✅ (D) DROP TABLE 移除資料表的結構定義與其全部資料。\n❌ (A) 新增資料列使用 INSERT。\n❌ (B) 刪除特定資料列使用 DELETE。\n❌ (C) 清空資料但保留結構使用 TRUNCATE 或 DELETE。\n📚 出處：SQL 的 DDL 與 DML。"
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "關聯模式（relational model）的實體完整限制（Entity Integrity Rule） ＿＿＿ ，除了限制資料庫中主鍵（Primary Key）不可重複外，還有何限制？",
   "o": [
    "主鍵只能是單一欄位",
    "主鍵不可為空值（NULL）",
    "主鍵必須參考一個有效的外來鍵的值",
    "主鍵必須是數值型態"
   ],
   "a": 1,
   "exp": "✅ (B) 實體完整性要求主鍵不得為空值，且不得重複。\n❌ (A) 主鍵可由多個欄位組成複合鍵。\n❌ (C) 參考有效值是外來鍵的參考完整性要求。\n❌ (D) 主鍵的資料型態不限於數值。\n📚 出處：關聯模式的完整性限制。"
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "一個資料表若符合關聯（relation）的定義，則該表亦滿足下列那個正規式？",
   "o": [
    "第四正規式（Fourth Normal Form）",
    "第三正規式（Third Normal Form）",
    "第二正規式（Second Normal Form）",
    "第一正規式（First Normal Form）"
   ],
   "a": 3,
   "exp": "✅ (D) 關聯的定義要求每個欄位值為單元值（不可再分），恰為第一正規式的條件。\n❌ (A) 第四正規式須另行消除多值相依。\n❌ (B) 第三正規式須另行消除遞移相依。\n❌ (C) 第二正規式須另行消除部分相依。\n📚 出處：正規化。"
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "關於資料庫 SQL 的運算子，下列何者可讓使用者依據字串比對去找出所要的資料？",
   "o": [
    "DISTINCT",
    "AS",
    "LIKE",
    "UNIQUE"
   ],
   "a": 2,
   "exp": "✅ (C) LIKE 搭配萬用字元進行字串的樣式比對。\n❌ (A) DISTINCT 用於去除重複列。\n❌ (B) AS 用於設定欄位或資料表的別名。\n❌ (D) UNIQUE 為欄位的唯一性限制。\n📚 出處：SQL 的查詢運算子。"
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列何者是屬於 NoSQL 的資料庫管理系統？",
   "o": [
    "MongoDB",
    "LAMPdbs",
    "Python",
    "Access"
   ],
   "a": 0,
   "exp": "✅ (A) MongoDB 為文件導向的 NoSQL 資料庫管理系統。\n❌ (B) LAMP 為 Linux、Apache、MySQL、PHP 的組合，非資料庫。\n❌ (C) Python 為程式語言。\n❌ (D) Access 為關聯式資料庫。\n📚 出處：NoSQL 資料庫。"
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "下列何者是近年來，在資料庫的發展中跟網頁相關最重要的科技？",
   "o": [
    "HTTP",
    "XML",
    "FTP",
    "TELNET"
   ],
   "a": 1,
   "exp": "✅ (B) XML 提供自我描述的結構化資料格式，是資料庫與網頁資料交換的重要技術。\n❌ (A) HTTP 為網頁的傳輸協定。\n❌ (C) FTP 為檔案傳輸協定。\n❌ (D) TELNET 為遠端登入協定。\n📚 出處：半結構化資料與 XML。"
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列何者是存於資料庫裏且用來描述綱目（Schema）的資料？",
   "o": [
    "使用者資料（End User Data）",
    "交易資料（Transaction Data）",
    "時間資料（Temporal Data）",
    "詮釋資料（Meta Data）"
   ],
   "a": 3,
   "exp": "✅ (D) 描述綱目（資料結構本身）的資料稱為詮釋資料。\n❌ (A) 使用者資料為實際儲存的業務資料。\n❌ (B) 交易資料記錄業務往來的明細。\n❌ (C) 時間資料記錄時間屬性。\n📚 出處：資料庫的資料字典與詮釋資料。"
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "資料庫的交易（Transaction）必須符合 ACID，其中 A 為 Atomicity、C 為 Consistency、D 為 Durability，而 I 是指？",
   "o": [
    "Integrity",
    "Identification",
    "Isolation",
    "Integration"
   ],
   "a": 2,
   "exp": "✅ (C) ACID 的 I 為隔離性（Isolation），確保並行交易互不干擾。\n❌ (A) Integrity 為完整性，非 ACID 的組成。\n❌ (B) Identification 與交易特性無關。\n❌ (D) Integration 指系統整合。\n📚 出處：交易的 ACID 特性。"
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "有一員工資料表 EMP，主鍵為 emp_id，另外兩個屬性為員工薪水（salary）和所屬部門代碼（dept_id），下列何者可列出每個部門的最高薪水和該部門的代碼？",
   "o": [
    "SELECT MAX(salary) FROM EMP",
    "SELECT salary FROM EMP GROUP BY dept_id",
    "SELECT MAX(salary), dept_id FROM EMP GROUP BY dept_id",
    "SELECT MAX(salary), dept_id FROM EMP GROUP BY salary"
   ],
   "a": 2,
   "exp": "✅ (C) 以 dept_id 分組並取各組薪水最大值，同時列出部門代碼。\n❌ (A) 未分組，只得全公司的最高薪水。\n❌ (B) 分組後選取未彙總的 salary 欄位，語法不合法。\n❌ (D) 以 salary 分組無法得到各部門的最高薪水。\n📚 出處：SQL 的 GROUP BY 與彙總函數。"
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "本題所列之 java 程式片段的執行，將印出下列何者？int numA = 10; int numB = 888; int numC = 6666;if (numA > numB)if (numB > numC)System.out.println (numB);else System.out.println (numA);System.out.println (numC);",
   "o": [
    "10",
    "6666",
    "888",
    "8886666 ＿＿＿ 6666"
   ],
   "a": 1,
   "exp": "✅ (B) else 與最接近的內層 if 結合；外層條件 10>888 為偽，整個 if-else 都不執行，只印出 numC＝6666。\n❌ (A) 印出 numA 須外層為真且內層為偽。\n❌ (C) 印出 numB 須兩層條件皆為真。\n❌ (D) if 區塊未執行，不會有兩行輸出。\n📚 出處：Java 的 dangling else 規則。"
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列選項中的 html 敘述，何者是替圖片加上超連結，可以讓使用者點選網頁上的圖片而連至另一個網頁http://www.mySchool.com？",
   "o": [
    "<a href=\" http://www.mySchool.com \"> <pic src=\"roses.jpeg\" ></a>",
    "<a href=\" http://www.mySchool.com \" src=\"roses.jpeg\" ></a>",
    "<a img=\" http://www.mySchool.com \"> < src=\"roses.jpeg\" ></a>",
    "<a href=\" http://www.mySchool.com \"> <img src=\"roses.jpeg\" ></a>"
   ],
   "a": 3,
   "exp": "✅ (D) 以 <a href=\"…\"> 包住 <img src=\"…\"> 即可讓圖片成為超連結。\n❌ (A) 並無 <pic> 標籤。\n❌ (B) <a> 標籤不使用 src 屬性，且未放入圖片元素。\n❌ (C) <a> 不使用 img 屬性，且 <src> 非合法標籤。\n📚 出處：HTML 的 <a> 與 <img> 標籤。"
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列選項中的敘述，何者是中央處理器（CPU）內部的記憶體？",
   "o": [
    "唯讀記憶體（ROM）",
    "韌體（Firmware）",
    "隨機存取記憶體（RAM）",
    "快取記憶體（Cache）"
   ],
   "a": 3,
   "exp": "✅ (D) 快取記憶體整合於 CPU 內部，用以縮短存取主記憶體的延遲。\n❌ (A) ROM 位於主機板上。\n❌ (B) 韌體是燒錄於 ROM 的程式，非 CPU 內部記憶體。\n❌ (C) RAM 為外部的主記憶體。\n📚 出處：記憶體階層。"
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "關於電腦系統的 bootstrap 程式之描述，下列何者錯誤？",
   "o": [
    "存放在電腦的隨機存取記憶體（Random Access Memory）中",
    "存放在電腦的唯讀記憶體（Read Only Memory）中",
    "當電腦冷開機（Cold Start）時第一個被執行的程式",
    "它最主要的任務就是將作業系統讀入記憶體（RAM）中"
   ],
   "a": 0,
   "exp": "✅ (A) 此項錯誤：RAM 為揮發性記憶體，開機時內容為空，無法存放啟動程式。\n❌ (B) 敘述正確，bootstrap 存放於 ROM。\n❌ (C) 敘述正確，冷開機時第一個被執行。\n❌ (D) 敘述正確，其任務為將作業系統載入 RAM。\n📚 出處：電腦的開機流程。"
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列何者為揮發性記憶體（Volatile Memory）？",
   "o": [
    "唯讀記憶體（Read Only Memory）",
    "隨機存取記憶體（Random Access Memory）",
    "快閃記憶體（Flash Memory）",
    "輔助記憶體（Secondary Memory）"
   ],
   "a": 1,
   "exp": "✅ (B) RAM 於斷電後資料即消失，屬揮發性記憶體。\n❌ (A) ROM 為非揮發性。\n❌ (C) 快閃記憶體為非揮發性。\n❌ (D) 輔助記憶體為非揮發性。\n📚 出處：揮發性與非揮發性記憶體。"
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "ALU（Arithmetic Logic Unit）是中央處理器（Central Processing Unit）內的一個模組，下列選項中的功能，何者不屬於 ALU 的工作範圍？",
   "o": [
    "進行算術運算",
    "進行邏輯運算",
    "進行關係比較運算",
    "協調處理器各單元間的運作與資料的傳送"
   ],
   "a": 3,
   "exp": "✅ (D) 協調各單元運作與資料傳送是控制單元（CU）的職責。\n❌ (A) 算術運算為 ALU 的工作。\n❌ (B) 邏輯運算為 ALU 的工作。\n❌ (C) 關係比較亦由 ALU 執行。\n📚 出處：CPU 的組成。"
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "作業系統中有一項作業是將資料在記憶體和儲存設備之間進行交換，下列何者為此功能之稱謂？",
   "o": [
    "Tapping",
    "Phishing",
    "Paging",
    "Thrashing"
   ],
   "a": 2,
   "exp": "✅ (C) 分頁（Paging）在主記憶體與輔助儲存裝置間搬移分頁資料。\n❌ (A) Tapping 指竊聽。\n❌ (B) Phishing 為網路釣魚。\n❌ (D) Thrashing 指分頁置換過於頻繁而造成效能崩潰的現象。\n📚 出處：虛擬記憶體與分頁。"
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "有兩個數值以二補數（Two’s Complement）來表示是為 1110 與 1011，則該兩數值相加的結果以十進位來表示是為下列何者？",
   "o": [
    "7",
    "-7",
    "10",
    "12"
   ],
   "a": 1,
   "exp": "✅ (B) 4 位元二補數下 1110＝－2、1011＝－5，相加為 －7。\n❌ (A) 7 為忽略符號位的誤算。\n❌ (C) 10 為把 1010 當成無號數的誤讀。\n❌ (D) 12 與二補數的解讀不符。\n📚 出處：二補數的表示與加法。"
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "某一個位元組（Byte）的數值以十六進位表示是為 AE，則其值等於下列何選項中以二進位表示的值？",
   "o": [
    "10101010",
    "10101110",
    "10101000",
    "01010101"
   ],
   "a": 1,
   "exp": "✅ (B) A＝1010、E＝1110，故 AE＝10101110。\n❌ (A) 10101010 對應十六進位的 AA。\n❌ (C) 10101000 對應 A8。\n❌ (D) 01010101 對應 55。\n📚 出處：十六進位與二進位的轉換。"
  },
  {
   "n": 41,
   "pt": 1,
   "type": "single",
   "q": "一棵階度（level）為 i 的完滿二元樹（Fully Binary Tree），其節點個數最多為多少？",
   "o": [
    "2 *ｉ",
    "ｉ2",
    "2i+1",
    "2i -1"
   ],
   "a": 3,
   "exp": "✅ (D) 階度為 i 的完滿二元樹，節點數最多為 2ⁱ－1。\n❌ (A) 2×i 遠小於實際的節點數上限。\n❌ (B) i² 非二元樹的節點數公式。\n❌ (C) 2ⁱ⁺¹ 超過上限。\n📚 出處：二元樹的性質。"
  },
  {
   "n": 42,
   "pt": 1,
   "type": "single",
   "q": "從程式效能分析來看，氣泡排序法（Bubble Sort）在最壞情況的時間複雜度（Time Complexity）為多少？",
   "o": [
    "O(n)",
    "O(n2)",
    "O(log n)",
    "O(n3)"
   ],
   "a": 1,
   "exp": "✅ (B) 氣泡排序最壞情況需兩層迴圈的比較與交換，時間複雜度為 O(n²)。\n❌ (A) O(n) 為最佳情況（已排序且設有提早結束的判斷）。\n❌ (C) O(log n) 為二分搜尋的複雜度。\n❌ (D) O(n³) 高於實際的複雜度。\n📚 出處：排序演算法的複雜度。"
  },
  {
   "n": 43,
   "pt": 1,
   "type": "single",
   "q": "下列何者是指駭客利用藍芽設備（如：手機和筆電）配對時，進行侵入設備而控制該設備？",
   "o": [
    "Bluebugging",
    "IP hijacking",
    "Capping",
    "Throttling"
   ],
   "a": 0,
   "exp": "✅ (A) Bluebugging 指透過藍牙入侵並控制他人裝置。\n❌ (B) IP hijacking 指劫奪 IP 位址或連線。\n❌ (C) Capping 指流量上限的設定。\n❌ (D) Throttling 指刻意限速。\n📚 出處：藍牙的資安威脅。"
  },
  {
   "n": 44,
   "pt": 1,
   "type": "single",
   "q": "網路上未經作者的同意就進行產品的散播、分享或下載，這是侵犯下列何選項中的權利？",
   "o": [
    "個資權",
    "著作權",
    "專利權",
    "隱私權"
   ],
   "a": 1,
   "exp": "✅ (B) 未經同意散布、分享或下載他人作品，侵害的是著作權。\n❌ (A) 個資權保護個人資料的蒐集與利用。\n❌ (C) 專利權保護技術發明。\n❌ (D) 隱私權保護私生活不受干擾。\n📚 出處：著作權法。"
  },
  {
   "n": 45,
   "pt": 1,
   "type": "single",
   "q": "關於數位簽章（Digital Signatures）的描述，下列何者錯誤？",
   "o": [
    "屬於電子簽章的一種",
    "只使用了公鑰加密法的技術",
    "可用於驗證訊息的內容未經篡改",
    "通常用於接受者的身分辨識"
   ],
   "a": 1,
   "exp": "✅ (B) 此項錯誤：數位簽章除公開金鑰技術外，還須使用雜湊函數產生訊息摘要。\n❌ (A) 敘述正確，數位簽章為電子簽章的一種。\n❌ (C) 敘述正確，可驗證訊息未遭篡改。\n❌ (D) 敘述正確，供收訊者辨識簽署者的身分。\n📚 出處：數位簽章的原理。"
  },
  {
   "n": 46,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是智慧財產權的範疇？",
   "o": [
    "網域名稱權",
    "商標權",
    "著作權",
    "隱私權"
   ],
   "a": 3,
   "exp": "✅ (D) 隱私權屬人格權，非智慧財產權。\n❌ (A) 網域名稱的爭議依智慧財產權法制處理。\n❌ (B) 商標權為智慧財產權。\n❌ (C) 著作權為智慧財產權。\n📚 出處：智慧財產權的範圍。"
  },
  {
   "n": 47,
   "pt": 1,
   "type": "single",
   "q": "直接提供檔案傳輸、電子郵件、網頁瀏覽等服務給使用者是屬於下列 OSI 模型那一層的工作？",
   "o": [
    "傳輸層（Transport Layer）",
    "會議層（Session Layer）",
    "應用層（Application Layer）",
    "網路層（Network Layer）"
   ],
   "a": 2,
   "exp": "✅ (C) 檔案傳輸、電子郵件、網頁瀏覽等服務由應用層直接提供給使用者。\n❌ (A) 傳輸層負責端對端的可靠傳送。\n❌ (B) 會議層管理連線的建立與同步。\n❌ (D) 網路層負責定址與路由。\n📚 出處：OSI 七層模型。"
  },
  {
   "n": 48,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是資料庫管理系統？",
   "o": [
    "MySQL",
    "Photoshop",
    "Oracle",
    "Access"
   ],
   "a": 1,
   "exp": "✅ (B) Photoshop 為影像編輯軟體，非資料庫管理系統。\n❌ (A) MySQL 為資料庫管理系統。\n❌ (C) Oracle 為資料庫管理系統。\n❌ (D) Access 為資料庫管理系統。\n📚 出處：常見的資料庫管理系統。"
  },
  {
   "n": 49,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是圖片檔案的格式？",
   "o": [
    "JPEG",
    "BMP",
    "TIFF",
    "XLS"
   ],
   "a": 3,
   "exp": "✅ (D) XLS 為試算表檔案格式。\n❌ (A) JPEG 為壓縮影像格式。\n❌ (B) BMP 為點陣圖格式。\n❌ (C) TIFF 為標籤影像檔案格式。\n📚 出處：常見的檔案格式。"
  },
  {
   "n": 50,
   "pt": 1,
   "type": "single",
   "q": "不同編碼的電腦要交換資料時，若沒有共同的編碼系統將無法解讀彼此的訊息，故為因應不同語言、不同編碼系統的電腦可以互通資料，制定了下列那一選項中的編碼系統？",
   "o": [
    "Big5 碼",
    "ASCII 碼",
    "Unicode 碼",
    "EBCDIC 碼"
   ],
   "a": 2,
   "exp": "✅ (C) Unicode 為涵蓋各國語言文字的統一編碼系統。\n❌ (A) Big5 僅供繁體中文使用。\n❌ (B) ASCII 僅編碼英文字母與符號。\n❌ (D) EBCDIC 為 IBM 大型主機使用的編碼。\n📚 出處：字元編碼系統。"
  }
 ]
};

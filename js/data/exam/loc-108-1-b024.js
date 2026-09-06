/* 108 年　四等　計算機概要（資訊處理組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-108-1-b024'] = {
 "id": "loc-108-1-b024",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 108,
 "nth": 1,
 "code": "108190",
 "subj": "b024",
 "title": "108 年　四等　計算機概要（資訊處理組）",
 "subjName": "計算機概要（資訊處理組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "N 位元二的補數（2's complement）能夠表示之負整數中，下列何者是能代表的最小負整數？",
   "o": [
    "-2N",
    "-2N-1",
    "-2N-1",
    "-2N-1-1"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列存放資料的裝置中，何者具有非揮發性（nonvolatility）？",
   "o": [
    "快閃記憶體（flash memory）",
    "靜態隨機存取記憶體（static random-access memory，SRAM）",
    "動態隨機存取記憶體（dynamic random-access memory，DRAM）",
    "處理器暫存器（register）"
   ],
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "有關中央處理器（central processing unit, CPU）與圖形處理器（graphics processing unit, GPU）的比較，下列何者錯誤？",
   "o": [
    "GPU 是用來增強特定運算的加速器，因此它不需要具備執行所有 CPU 工作的能力",
    "CPU 強調利用多緒處理來隱藏記憶體延遲，GPU 則強調利用多層的快取來克服記憶體存取時的延遲時間",
    "GPU 記憶體的設計著重提高頻寬",
    "GPU 比 CPU 可容納更多的執行緒（threads）"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "在雲端計算的環境中，虛擬化技術扮演重要角色，有關虛擬機器的敘述，下列何者錯誤？",
   "o": [
    "多個使用者共用同一個實體伺服器時，可以利用虛擬機器來隔離執行環境，以保護使用者間互相不受干擾",
    "可以使用虛擬機器來控制使用者在實體伺服器硬體資源使用，如：可使用處理器個數與記憶體容量",
    "一台實體伺服器上的每個虛擬機器所執行的作業系統，皆可自由使用實體伺服器上所有的硬體資源",
    "在虛擬機器上執行的作業系統，可以和實體伺服器的作業系統不同"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "在管道化處理（Pipelining）機制下，可能會出現三種主要的不同類型的危障（Hazards），下列那一個敘述指的是數據危障（Data Hazard）？",
   "o": [
    "預測分支（Branch）指令的結果，讓後續指令繼續執行",
    "當安排好的指令由於硬體無法支援當時應予執行的一組指令，而無法在適當時脈週期內執行的情況",
    "當所擷取的指令並非所需的指令，而造成適當的指令無法在恰當的時脈中執行",
    "當指令應該被執行時由於其執行所需之數據尚未備妥，而無法在適當時脈週期內執行的情況"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "不同的計算機系列使用不同的指令集（Instruction Sets）。指令集設計有複雜指令集計算機（ComplexInstruction Set Computer，CISC）與精簡指令集計算機（Reduced Instruction Set Computer，RISC）兩大主要趨勢。針對兩者的比較，一般而言下列敘述何者錯誤？",
   "o": [
    "CISC 的指令格式較多",
    "CISC 的指令執行速度較慢，且不易於提升運作時脈",
    "RISC 的指令長度固定，方便解碼",
    "CISC 可以以較少指令完成相同目的的計算，因此完成運算的時間較短"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "假設單一磁碟的故障前平均時間（Mean Time to Failure，MTTF）為 120,000 小時，且硬碟發生故障的機率是彼此獨立的，而更換一顆故障的硬碟，並將裡面的資料還原所需的時間為 10 小時。若我們用 2 顆這樣的硬碟組成 RAID 1，則此系統的資料遺失前平均時間（Mean Time to Data Loss，MTTDL）為多少小時？",
   "o": [
    "120,010",
    "240,000",
    "720,000,000",
    "1,440,000,000"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "關於記憶體管理中的碎片（fragmentation）問題，下列敘述何者錯誤？",
   "o": [
    "外部碎片（external fragmentation）指的是系統雖然有足夠的可用記憶體空間足以滿足需求，但目前可用空間是以不連續的區域散處各地，而且任一區域均無法單獨滿足該需求",
    "內部碎片（internal fragmentation）是指某塊記憶體分割空間（partition）內部有不會被使用的部分",
    "解決內部碎片的其中一種方法是透過壓實（compaction）",
    "壓實只有在重定址（relocation）是動態的（dynamic）且可在該應用程式執行期間（execution period）內進行才能達成"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "有關資料區域性（data locality）原則的敘述，下列何者錯誤？",
   "o": [
    "時間區域性（temporal locality）是指一筆剛被存取過的資料，短期內不會再被存取",
    "正確地分析與運用程式存取資料時的區域性，將有助於減少分頁錯失（page fault）的數量",
    "空間區域性（spatial locality）是指一筆資料若被存取，則附近的資料也很有可能在近期內被存取",
    "正確地分析與運用程式存取資料時的區域性，將有助於提升快取命中（cache hit）的機率"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列何種邏輯閘，可以用來建構出其他所有的邏輯閘？",
   "o": [
    "AND",
    "OR",
    "NAND",
    "XOR"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "計算機的儲存容量單位通常為 GB、KB、MB、或是 TB 表示，將這四種單位從小到大排序，下列何者正確？",
   "o": [
    "TB<KB<MB<GB",
    "GB<TB<KB<MB",
    "MB<GB<TB<KB",
    "KB<MB<GB<TB"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列時間數值中，何者最小？",
   "o": [
    "1,000,000 ps",
    "0.0025 ms",
    "500 ns",
    "0.1 μs"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "在布林運算中有關於二的補數（2's complement）敘述，下列何者錯誤？",
   "o": [
    "二的補數是一種用二進制表示有號數的方法",
    "減法能用加法的運算來處理",
    "一個數字的二的補數就是將該數字作位元反相運算，再將結果加 1",
    "二的補數中 0 有兩個表示方式"
   ],
   "a": 3
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列有關十進制數字 592 的進制轉換，何者正確？",
   "o": [
    "(1001110000)2",
    "(21100)4",
    "(1110)8",
    "(230)16"
   ],
   "a": 1
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "兩個二進位元串 10110010 與 01010110 做 OR 運算後再與 11110110 做 XOR 的結果為何？",
   "o": [
    "00000000",
    "00010010",
    "11100100",
    "11110110"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "以 4 個 D 型正反器 (D flip-flops) 實現的移位器 (Shifter)，在重置（Reset）後若串列輸入依序為 1001，同一時間串列輸出端依序所看到的數字輸出，由左至右排列為何？",
   "o": [
    "1001",
    "0100",
    "1000",
    "0001"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "二的補數運算中，11110000 減 00011000 的結果為何？",
   "o": [
    "00101000",
    "00001000",
    "11111000",
    "11011000"
   ],
   "a": 3
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "設計一個 1 對 15 的解多工器（Demultiplexer），則該解多工器至少需要幾條選擇線？",
   "o": [
    "4",
    "5",
    "6",
    "7"
   ],
   "a": 0
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "布林代數（xy）' 與下列那一項相等？",
   "o": [
    "x+y",
    "x'+y'",
    "x'y'",
    "xy"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "早期盛行於臺灣的正體 (繁體) 中文字編碼方式為何？",
   "o": [
    "萬國碼（Unicode）",
    "大五碼（Big 5）",
    "漢明碼 (Hamming Code)",
    "格雷碼（Gray Code）"
   ],
   "a": 1
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下列那一項不是作業系統核心中，虛擬記憶體管理單元（virtual memory manager）的功能？",
   "o": [
    "方便動態連結程式庫的實作",
    "讓電腦系統可以執行超過實體記憶體大小的程式",
    "決定不同程序（processes）之間的處理順序",
    "設定記憶體存取權限"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "有關良好的軟體設計中，以軟體模組的內聚力（cohesion）與耦合力（coupling）作為設計目標，下列何者正確？",
   "o": [
    "低內聚力且低耦合力",
    "低內聚力且高耦合力",
    "高內聚力且低耦合力",
    "高內聚力且高耦合力"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "在電腦系統中，分頁（page）是配置主記憶體給程序使用的一個單位，如果採用較大的分頁，將會有何優點？",
   "o": [
    "減少內部碎片（internal fragmentation）",
    "減少外部碎片（external fragmentation）",
    "降低處理一次分頁錯失（page fault）所需的時間",
    "分頁表（page table）使用的記憶體空間較小"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "對於磁碟的毀損磁區（Bad Block）問題，可以採用低階磁碟控制，以額外磁區取代毀損磁區的方式來解決。下列何者不屬於這樣的解決方法？",
   "o": [
    "磁區備份（Sector Sparing）",
    "磁區組合（Sector Combination）",
    "磁區順延（Sector Slipping）",
    "磁區取代（Sector Forwarding）"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "文字編輯器（如 Microsoft Word、記事本等）通常都提供復原（Undo）功能，供使用者取消當前的編輯操作，並復原至上一次的文字狀態。下列各種資料結構中，何者最適於儲存文字狀態的改變歷程，以實現文字編輯器的復原功能？",
   "o": [
    "雜湊表（Hash Table）",
    "佇列（Queue）",
    "堆疊（Stack）",
    "樹（Tree）"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "若使用陣列實作最大堆積（max-heap），下列敘述何者錯誤？",
   "o": [
    "尋找一個節點的子節點的時間複雜度為 O(1)",
    "尋找一個節點的父節點的時間複雜度為 O(1)",
    "節點的分支度（degree）為 0 或 2",
    "新增一個數值至一個具有 n 個節點的最大堆積的時間複雜度為 O(log n)"
   ],
   "a": 2
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "過去多年網際網路的發展創造了一個虛擬世界，而隨著各種感測器和嵌入式技術的快速發展，內建各式感測器的連網型裝置可以整合虛擬世界和實體世界，提供更多、更廣泛的自動化控制及應用。下列那一個名詞代表了這項新的技術趨勢？",
   "o": [
    "網際網路 2.0 (Web 2.0)",
    "物聯網（Internet of Things, IoT）",
    "擴增實境（augmented reality）",
    "虛擬實境（virtual reality）"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "關於加密演算法，下列敘述何者錯誤？",
   "o": [
    "為了避免訊息被其他人看到，非對稱加密演算法（asymmetric encryption algorithm）在傳送端利用接收端的公鑰（public key）加密訊息，接收端則利用自己的私鑰（private key）解密以取得訊息",
    "RSA 是一種對稱加密演算法（symmetric encryption algorithm）",
    "DES（Data Encryption Standard）是一種區塊加密（block cipher）方式",
    "RC4 是一種串流加密（stream cipher）方式"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "關於作業系統中程序間通訊（Inter-Process Communication，IPC）機制的敘述，下列何者錯誤？",
   "o": [
    "訊息傳送（Message Passing）機制可以跨越不同機器的程序間傳遞資料",
    "通訊資料量較大時，採用共用記憶體（Shared Memory）機制較訊息傳送機制為佳",
    "信號（Signal）機制是透過中斷處理的方式來完成對應的處理工作",
    "UNIX PIPE 是一種訊息傳送機制"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "關於使用者層次執行緒（User-level Thread）對應到核心執行緒（Kernel Thread）的關聯性模式之比較，下列那一種模式適用於即時系統，也能利用多處理核心（Multiple Processing Core）的優點，又能支援使用者足夠的執行緒數量需求？",
   "o": [
    "多對多（Many-to-Many）模式",
    "1 對 1（One-to-One）模式",
    "多對 1（Many-to-One）模式",
    "二層（Two-level）模式"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "使用多核心處理器（Multicore Processor）的電腦已經相當普遍，因此如何撰寫能發揮多核心處理器效能的多核心程式（Multicore Programming）是程式設計師需面臨的挑戰。下列何者不是一般在設計多核心程式時最主要考慮的議題？",
   "o": [
    "確保平行任務可以執行對等價值的相當工作（Balance）",
    "節能（Power Saving）",
    "資料相依性（Data Dependency）",
    "資料分割（Data Splitting）"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "垃圾回收（Garbage collection）是一種用來回收所有程序不會再使用的實體記憶區塊、以供未來使用的機制。下列那一種演算法不是常用的垃圾回收演算法？",
   "o": [
    "複製回收演算法 （Copying algorithm）",
    "標記清除演算法（Mark-and-sweep algorithm）",
    "分代回收演算法（Generational algorithm）",
    "最佳配適算法（Best-fit algorithm）"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "使用者希望能夠隨時依據當下的需求，使用適當形式以及適量的計算機軟硬體資源，就像我們使用自來水與電力的情形一樣。下列那一個名詞敘述這個方向的技術發展？",
   "o": [
    "無所不在計算（ubiquitous computing）",
    "雲端計算（cloud computing）",
    "叢集計算（cluster computing）",
    "普及計算（pervasive computing）"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 或 Linux 作業系統中，下列何者是刪除檔案的指令？",
   "o": [
    "del",
    "kill",
    "rm",
    "exit"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "對於傳統電話而言，一般只考慮最高到 4kHz 的音訊。因此，最低的取樣頻率，應為下列何者？",
   "o": [
    "2 kHz",
    "4 kHz",
    "8 kHz",
    "16 kHz"
   ],
   "a": 2
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "虛擬實境（Virtual Reality）具有三個基本特徵，亦即三個「I」， 它強調在虛擬實境中「人」的主導作用，但不包括下列何者？",
   "o": [
    "Important（重要）",
    "Imagination （想像）",
    "Interaction（互動）",
    "Immersion（沉浸）"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列壓縮格式中，何者一定為無損壓縮（lossless compression）？",
   "o": [
    "PNG",
    "MPEG-2",
    "H.264",
    "VC-1"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列何種影像類型，屬於索引式色彩？",
   "o": [
    "灰階影像",
    "全彩影像",
    "16 色影像",
    "高彩影像"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "一張 20×20 的「16 色」彩色影像，在完全不經壓縮時，至少需要多少位元組（byte）的空間？",
   "o": [
    "200",
    "400",
    "1600",
    "6400"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列那一種影像格式使用 LZW（Lempel-Ziv-Welch）編碼法？",
   "o": [
    "GIF",
    "PNG",
    "JPEG",
    "TIFF"
   ],
   "a": 0
  }
 ]
};

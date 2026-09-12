/* 103 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-103-1-b023'] = {
 "id": "loc-103-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 103,
 "nth": 1,
 "code": "103180",
 "subj": "b023",
 "title": "103 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "在資料庫產生資料表的 SQL 語法中，如果在 create table 的指令中，加入了 on update cascade，其目的是為了 使得資料庫具有何種特性？",
   "o": [
    "一致性",
    "獨立性",
    "完整性",
    "安全性"
   ],
   "a": 0,
   "exp": "✅ (A) ON UPDATE CASCADE 使被參照的鍵值更新時，參照它的資料列一併連動更新，各資料表的值不致互相矛盾，維持的是資料的一致性。\n❌ (B) 獨立性指資料與應用程式分離，與此無關。\n❌ (C) 完整性著重資料是否符合定義的規則與限制，而非更新時的同步連動。\n❌ (D) 安全性著重存取權限的控制。\n📚 出處：關聯式資料庫的參照動作（referential action）"
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫（relational database）中，若要表示每個員工（employee）有一個不會和他人重複的編號（id）、一個姓名（name）和很多個電話號碼（tel），我們不會定義成一個關聯：employee（id,name,tel），而是定義成兩個關聯：employeel （id,name）和 employee2 (id,tel）。這樣做的目的是為了符合下列那種正規式（normalform）的要求？第一正規式（first normal form） ＿＿＿ 第二正規式（second normal form）第三正規式（third normal form） ＿＿＿ BC 正規式（Boyce-Codd normal form）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/103180_436_2213_2.webp",
   "a": 0,
   "exp": "✅ (A) 第一正規式要求每個屬性值均為單元值（不可有重複群組）；一位員工有多個電話會使 tel 欄位出現多值，故須拆為兩個關聯。\n❌ (B) 第二正規式處理非鍵屬性對候選鍵的部分相依。\n❌ (C) 第三正規式處理非鍵屬性間的遞移相依。\n❌ (D) BC 正規式處理決定因素非候選鍵的情形。\n📚 出處：關聯式資料庫的正規化"
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列何者為八進位數(42)8 與八進位數(24)8 相減的結果？",
   "o": [
    "(18)8",
    "(16)8",
    "(14)8",
    "(12)8"
   ],
   "a": 1,
   "exp": "✅ (B) (42)₈＝34、(24)₈＝20，相減得 14；14 轉為八進位為 (16)₈。\n❌ (A) (18)₈ 不是合法的八進位表示（不含數字 8）。\n❌ (C) (14)₈＝12，與差值不符。\n❌ (D) (12)₈＝10，與差值不符。\n📚 出處：進位數系統的運算"
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "十六位元（bit）無號整數（unsigned integer）所能表示的最大數值為何？",
   "o": [
    "32767",
    "32768",
    "65535",
    "65536"
   ],
   "a": 2,
   "exp": "✅ (C) 16 位元無號整數可表示 0 至 2¹⁶−1，最大值為 65535。\n❌ (A) 32767 是 16 位元有號整數的最大值。\n❌ (B) 32768 是 2¹⁵。\n❌ (D) 65536 是 2¹⁶，已超出可表示的範圍。\n📚 出處：整數的二進位表示範圍"
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "若欲使用 Verilog 語言合成（synthesize）出與下圖相同功能的電路，則下列各 Verilog 模組何者正確？",
   "o": [
    "A",
    "D",
    "XBYCclock",
    "module TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;reg Y;always @(posedge clock) X <= A | B;always @(B or C) Y = B & C; endmodulemodule TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;reg Y;always @(posedge clock) X <= A | B;always @(posedge clock) Y = B & C; endmodulemodule TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;wire Y;always @(posedge clock) X = A | B;always @(posedge clock) Y = B & C;endmodulemodule TestCircuit (A, B, C, clock, X, Y);input A;input B;input C;input clock;output X;output Y;reg X;reg Y;always @(posedge clock) X <= A+B;always @(B or C) Y = B * C;endmodule"
   ],
   "a": 0
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "一數位計算機使用 16 位元指令（instruction），該指令分成 3 個欄位：Opcode 欄位、暫存器位址欄位（register address field）、立即運算元（immediate operand）欄位。若該指令集可支援 110 個不同的運算與 32 個暫存 器，試問該指令中的 opcode 至少需要幾個位元？",
   "o": [
    "6",
    "7",
    "8",
    "9"
   ],
   "a": 1,
   "exp": "✅ (B) 支援 110 種不同運算需 ⌈log₂110⌉＝7 個位元（2⁶＝64 不足，2⁷＝128 足夠）。\n❌ (A) 6 位元只能表示 64 種運算。\n❌ (C) 8 位元雖足夠但非「至少」需要的位元數。\n❌ (D) 9 位元更超出所需。\n📚 出處：指令格式與 opcode 位元數"
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "在 I /O 控制技術中，下列何者指的是數據可不經由中央處理器而在 I /O 設備及主記憶體間傳輸？",
   "o": [
    "programmed I /O",
    "interrupt-driven I /O",
    "isolated I /O",
    "DMA"
   ],
   "a": 3,
   "exp": "✅ (D) 直接記憶體存取（DMA）由 DMA 控制器直接在 I/O 裝置與主記憶體之間搬移資料，毋須經過 CPU。\n❌ (A) programmed I/O 由 CPU 以輪詢方式逐筆搬運資料。\n❌ (B) interrupt-driven I/O 仍由 CPU 於中斷服務常式中搬運資料。\n❌ (C) isolated I/O 指 I/O 位址空間與記憶體分離的定址方式。\n📚 出處：I/O 控制技術"
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列各種現行常用的記憶體中，何者一旦失去電源供應後資料就會消失？",
   "o": [
    "靜態隨機存取記憶體（static RAM）",
    "可清除及可程式的唯讀記憶體（EPROM）",
    "可用電的方式清除及可程式的唯讀記憶體（EEPROM）",
    "快閃記憶體（flash memory）"
   ],
   "a": 0,
   "exp": "✅ (A) 靜態隨機存取記憶體為揮發性記憶體，電源中斷後資料即消失。\n❌ (B) EPROM 為非揮發性，須以紫外線清除。\n❌ (C) EEPROM 為非揮發性，可電氣抹除。\n❌ (D) 快閃記憶體為非揮發性。\n📚 出處：記憶體的分類（揮發性與非揮發性）"
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "布林函數 Y = A + AB + ABC + ABCD 可化簡為下列何者？",
   "o": [
    "Y=A+C",
    "Y=A+B",
    "Y=A+D",
    "Y=A"
   ],
   "a": 1,
   "exp": "✅ (B) 原題的補數符號（上橫線）在轉檔時遺失，式子應為 Y＝A＋Ā B＋Ā B C＋Ā B C D；由 A＋Ā B＝A＋B，其餘各項均被 B 所涵蓋，故化簡為 Y＝A＋B。\n❌ (A) 化簡結果不含 C。\n❌ (C) 化簡結果不含 D。\n❌ (D) 僅得 A 是把 Ā B 項一併吸收的誤判。\n📚 出處：布林代數的化簡（A＋Ā B＝A＋B）"
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列電路中，何者為循序電路（sequential circuit）？ ＿＿＿ A ＿＿＿ A",
   "o": [
    "SSBCAS11",
    "DX",
    "BSS0D",
    "Cclock"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 系統上，下列關於掛載點（mount point）的敘述何者錯誤？",
   "o": [
    "掛載點可為一般檔案（regular file）",
    "掛載點可為空目錄（empty directory）",
    "掛載點可為非空目錄（non-empty directory）",
    "一般作業系統可允許多個掛載點"
   ],
   "a": 0,
   "exp": "✅ (A) 掛載點必須是目錄，不能是一般檔案，故本項敘述錯誤。\n❌ (B) 空目錄是最常見的掛載點。\n❌ (C) 非空目錄亦可作為掛載點，掛載後原內容被遮蔽。\n❌ (D) 一般作業系統允許同時存在多個掛載點。\n📚 出處：UNIX 檔案系統的掛載"
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在 UNIX 系統中，下列何者可列出目前路徑中所有的檔案？",
   "o": [
    "使用 vi 指令",
    "使用 ls 指令",
    "使用 mount 指令",
    "使用 man 指令"
   ],
   "a": 1,
   "exp": "✅ (B) ls 指令用於列出目錄中的檔案與子目錄。\n❌ (A) vi 為文字編輯器。\n❌ (C) mount 用於掛載檔案系統。\n❌ (D) man 用於查詢線上手冊。\n📚 出處：UNIX 常用指令"
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "三個程序 A、B、C 已依序送入電腦等待執行，且它們所需的執行時間分別是 10、8、13 個單位時間。如果 該電腦使用依序循環（round robin）排程演算法來執行該等程序，且每個時間切割（time quantum）為 5 個 單位，則該三個程序的平均等待時間為若干單位？",
   "o": [
    "6.2",
    "14.33",
    "9.33",
    "8.67"
   ],
   "a": 1,
   "exp": "✅ (B) 時間切割 5：A 於 20 完成、B 於 23 完成、C 於 31 完成；等待時間＝完成時間−執行時間，分別為 10、15、18，平均＝43÷3≒14.33。\n❌ (A) 6.2 與排程結果不符。\n❌ (C) 9.33 低估了等待時間。\n❌ (D) 8.67 低估了等待時間。\n📚 出處：Round Robin 排程演算法"
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "假設記憶體中儲存一個整數（Integer）資料必須使用 4 個位元組（Byte），若一整數陣列（Array）宣告為 A[m][n]且 A[0][0]為其第一個元素。若 A[3][11]儲存於記憶體中之位址（Address）為 146774，又 A[8][2]儲 存於記憶體中之位址（Address）為 147078，則下列各敘述何者正確？",
   "o": [
    "m 無法判斷其值，但 n<16",
    "n 無法判斷其值，但 m>22",
    "陣列 A 組成元素儲存於記憶體中之位置順序是依“行為主順序（Column major order）”之方式儲存",
    "陣列 A 至少有 153 個組成元素"
   ],
   "a": 3,
   "exp": "✅ (D) 位址差 147078−146774＝304 位元組＝76 個元素；依列為主順序 (8n＋2)−(3n＋11)＝5n−9＝76，得 n＝17；因存在 A[8][2]，列數至少 9，故元素至少 9×17＝153 個。\n❌ (A) n 可求得為 17，且大於 16。\n❌ (B) m 只能推知至少為 9，無法斷言大於 22。\n❌ (C) 計算結果符合列為主（row major）順序。\n📚 出處：二維陣列的位址計算"
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是作業系統所負責的工作項目？",
   "o": [
    "管理中央處理器（CPU）以求提高其使用率",
    "確認 CPU 的輸出是否正確",
    "分配記憶體給每個程序",
    "讓使用者可以容易地使用周邊設備"
   ],
   "a": 1,
   "exp": "✅ (B) 確認 CPU 運算結果是否正確屬硬體設計與程式驗證的範疇，不是作業系統的工作。\n❌ (A) 行程排程以提高 CPU 使用率是作業系統的核心工作。\n❌ (C) 記憶體配置與管理是作業系統的工作。\n❌ (D) 提供裝置驅動與統一介面以便利周邊使用是作業系統的工作。\n📚 出處：作業系統的功能"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "若堆疊中已存有 n 個元素（elements），則其 push 及 pop 之最差時間複雜度分別為何？（註：push 為加入 一元素到 stack 之動作，pop 為由 stack 取出一元素之動作。）",
   "o": [
    "push：θ(1)，pop：θ(1)",
    "push：θ(n)，pop：θ(1)",
    "push：θ(1)，pop：θ(n)",
    "push：θ(n)，pop：θ(n)"
   ],
   "a": 0,
   "exp": "✅ (A) 堆疊的 push 與 pop 僅在頂端進行，與元素個數無關，時間複雜度均為 θ(1)。\n❌ (B) push 不需搬移既有元素。\n❌ (C) pop 同樣只取出頂端元素。\n❌ (D) 兩者都不需要線性時間。\n📚 出處：堆疊的基本運算"
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "在一個空的二元搜尋樹（binary search tree）依序插入關鍵值（keys）5、4、1、3、2 後，則對於存有關鍵值 3 的節點，下列敘述何者正確？",
   "o": [
    "其兄弟節點（sibling）所存的關鍵值為 1",
    "其兄弟節點所存的關鍵值為 2",
    "其兄弟節點所存的關鍵值為 4",
    "其兄弟節點不存在"
   ],
   "a": 3,
   "exp": "✅ (D) 依序插入 5、4、1、3、2 後，5 為根，4 為其左子，1 為 4 的左子，3 為 1 的右子，2 為 3 的左子；節點 1 只有右子 3 而無左子，故 3 沒有兄弟節點。\n❌ (A) 1 是 3 的父節點而非兄弟。\n❌ (B) 2 是 3 的子節點。\n❌ (C) 4 是 3 的祖父節點。\n📚 出處：二元搜尋樹的插入"
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列各圖（graph）何者不是樹狀結構（tree）？aa ＿＿＿ fb ＿＿＿ c ＿＿＿ b ＿＿＿ c ＿＿＿ ed ＿＿＿ g ＿＿＿ hd ＿＿＿ eia ＿＿＿ d ＿＿＿ e ＿＿＿ a ＿＿＿ d ＿＿＿ eb ＿＿＿ c ＿＿＿ b ＿＿＿ c",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/103180_436_2213_18.webp",
   "a": 2,
   "exp": "✅ (C) 該圖有 5 個節點卻有 6 條邊（a-b、a-d、b-c、c-d、d-e、c-e），存在迴路，不符合樹「n 個節點恰有 n−1 條邊且無迴路」的條件。\n❌ (A) 為典型的二元樹結構。\n❌ (B) 9 個節點 8 條邊且連通無迴路，是樹。\n❌ (D) 5 個節點 4 條邊且無迴路，是樹。\n📚 出處：樹的定義與性質"
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下圖中所含的最小擴張樹（minimal spanning tree）其各邊為何？1 27 6 123 4(0,1),(0,2),(1,3),(3,5),(3,2),(1,4) (0,2),(2,3),(2,4),(4,5),(1,4)(0,1),(0,2),(1,3),(3,5),(5,4) (0,1),(1,3),(3,2),(1,4),(3,5)",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/103180_436_2213_19.webp",
   "a": 3,
   "exp": "✅ (D) 依 Kruskal 由小到大選邊：(1,3)＝3、(0,1)＝5、(2,3)＝6、(1,4)＝7、(3,5)＝15，共 5 條邊連接 6 個頂點且無迴路，總權重 36。\n❌ (A) 含 (0,2)＝8 與 (3,2)＝6，會形成迴路且權重較高。\n❌ (B) 含 (2,4)＝12 與 (4,5)＝20，權重明顯較大。\n❌ (C) 含 (5,4)＝20，權重較大。\n📚 出處：最小擴張樹（Kruskal 演算法）"
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "一圖形（graph）有 n 個端點（vertices）以及 e 個邊（edges）。若用相鄰串列（adjacency list）來表示該圖 形，則決定該圖形有多少個邊所需之時間複雜度（time complexity）為何？",
   "o": [
    "O(n+e)",
    "O(e log n)",
    "θ(n2)",
    "O(n log n)"
   ],
   "a": 0,
   "exp": "✅ (A) 以相鄰串列表示時，須走訪每個頂點的串列並累計節點數，時間複雜度為 O(n＋e)。\n❌ (B) O(e log n) 是某些含排序或優先佇列演算法的複雜度。\n❌ (C) θ(n²) 是使用相鄰矩陣時的複雜度。\n❌ (D) O(n log n) 與走訪串列的成本不符。\n📚 出處：圖形的表示法與走訪成本"
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "一般在處理資料排序時，下列那種排序法所需的儲存空間最多？",
   "o": [
    "氣泡排序法（bubble sort）",
    "插入排序法（insertion sort）",
    "快速排序法（quick sort）",
    "選擇排序法（selection sort）"
   ],
   "a": 2,
   "exp": "✅ (C) 快速排序法採遞迴分割，最差情況下遞迴深度可達 n，所需的堆疊空間為 O(n)，在四者中額外空間需求最多。\n❌ (A) 氣泡排序法為原地排序，額外空間 O(1)。\n❌ (B) 插入排序法同為原地排序。\n❌ (D) 選擇排序法亦為原地排序。\n📚 出處：排序演算法的空間複雜度"
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "循序搜尋法（sequential search）在最糟情況（worst case）下搜尋一個數字的時間複雜度為何？",
   "o": [
    "θ(1)",
    "θ(log n)",
    "θ(n)",
    "θ(n log n)"
   ],
   "a": 2,
   "exp": "✅ (C) 循序搜尋在最糟情況下須比較全部 n 個元素，時間複雜度為 θ(n)。\n❌ (A) θ(1) 是雜湊表在理想情況下的搜尋成本。\n❌ (B) θ(log n) 是二分搜尋的成本。\n❌ (D) θ(n log n) 是比較式排序的下界。\n📚 出處：搜尋演算法的時間複雜度"
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "#include <stdio.h> int main(void) { int a[10]={0},i; printf(\"%p\", &(a[0])) ; printf(\"%p\", a) ; return 0; } 上述 C 程式，若執行「printf(\"%p\", &(a[0]));」輸出的結果為 0028FEF4，則繼續執行「printf(\"%p\", a);」將會 輸出：",
   "o": [
    "0",
    "10",
    "0028FEF4",
    "0028FEF8"
   ],
   "a": 2,
   "exp": "✅ (C) 在 C 語言中陣列名稱即代表其第一個元素的位址，故 a 與 &a[0] 的值相同，同樣輸出 0028FEF4。\n❌ (A) 輸出的是位址而非元素值。\n❌ (B) 10 是陣列長度，非位址。\n❌ (D) 0028FEF8 是 a[1] 的位址。\n📚 出處：C 語言的陣列與指標"
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列的 C++語言程式執行後輸出為何？ ＿＿＿ #include <iostream> ＿＿＿ using namespace std; ＿＿＿ int x=0; ＿＿＿ class A ＿＿＿ { ＿＿＿ public: ＿＿＿ void fun(){x++;}; ＿＿＿ }; ＿＿＿ class B：public A ＿＿＿ { ＿＿＿ public: ＿＿＿ void fun(){x=0;}; ＿＿＿ }; ＿＿＿ class C：public A ＿＿＿ { ＿＿＿ public: ＿＿＿ void fun(){x--;}; ＿＿＿ }; ＿＿＿ int main() ＿＿＿ { ＿＿＿ A a; ＿＿＿ B b; ＿＿＿ C c; ＿＿＿ A * d[3]; ＿＿＿ d[0]=&a; ＿＿＿ d[1]=&b; ＿＿＿ d[2]=&c; ＿＿＿ for(int i=0;i<3;i++) d[i]->fun(); ＿＿＿ cout<<x; ＿＿＿ }",
   "o": [
    "3",
    "-1",
    "1",
    "0"
   ],
   "a": 0,
   "exp": "✅ (A) fun() 未宣告為 virtual，透過 A* 指標呼叫時採靜態繫結，三次呼叫的都是 A::fun()，x 被累加三次，輸出 3。\n❌ (B) −1 是誤以為執行了 C::fun()。\n❌ (C) 1 是誤以為 B::fun() 將 x 歸零後再累加。\n❌ (D) 0 是誤以為最後執行 B::fun()。\n📚 出處：C++ 的虛擬函式與靜態繫結"
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式的輸出應為何？ ＿＿＿ #include <stdio.h> ＿＿＿ int unknown(int array [], int size , int key) ＿＿＿ { ＿＿＿ int left = 0, right = size-1, middle; ＿＿＿ while( left <= right) ＿＿＿ {",
   "o": [
    "middle = (left+right) / 2;",
    "if( array[middle] == key){return( array[middle]);",
    "}",
    "else if( array[middle] > key)right = middle - 1;elseleft = middle + 1;"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行以下 C 語言撰寫之程式，下列敘述何者正確？ #include <stdio.h> #include <iostream> main() {",
   "o": [
    "int i=18, s=0;do",
    "{s=s+i;",
    "}while(i<18);",
    "printf(\"%d\",s);system(\"PAUSE\");"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列各 C 語言函式宣告中，何者錯誤？",
   "o": [
    "double fn(void);",
    "float fn(a,b,c,d);",
    "double fn(int,double,float);",
    "int fn(int a,double b,float);"
   ],
   "a": 1,
   "exp": "✅ (B) 函式宣告（原型）中的參數必須指明型別，只寫參數名稱而無型別的 float fn(a,b,c,d); 為錯誤宣告。\n❌ (A) void 表示不接受參數，合法。\n❌ (C) 僅列型別而省略參數名稱是合法的原型寫法。\n❌ (D) 型別與名稱混用、最後一個僅有型別，仍屬合法。\n📚 出處：C 語言的函式原型宣告"
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式後，產生的輸出為何？ #include <stdio.h> void foo(){ static int a = 0;",
   "o": [
    "int b = 0;",
    "a = a+1;",
    "b = b+1;",
    "printf(\"%d-%d;\", a, b);"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列的 C++語言程式執行後輸出為何？ ＿＿＿ #include <iostream> ＿＿＿ #include <string> ＿＿＿ using namespace std; ＿＿＿ int main() ＿＿＿ {",
   "o": [
    "int a=0, b=0;string * s1=new string(\"test\");string * s2=new string(\"test\");00",
    "02",
    "20",
    "22"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 C++程式語言具有的性質？",
   "o": [
    "封裝（encapsulation）",
    "繼承（inheritance）",
    "多型（polymorphism）",
    "垃圾收集（garbage collection）"
   ],
   "a": 3,
   "exp": "✅ (D) C++ 不提供自動垃圾收集，動態配置的記憶體須由程式設計者自行以 delete 釋放。\n❌ (A) 封裝是 C++ 物件導向的基本特性。\n❌ (B) 繼承是 C++ 支援的特性。\n❌ (C) 多型可透過虛擬函式實現。\n📚 出處：C++ 的物件導向特性"
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "請選出下列有關 IEEE 802.3 區域網路四項敘述的所有正確者：①通常使用 UTP（Unshielded Twisted Pair） 線為傳輸線 ②通常以基頻（Baseband）訊號來傳遞 ③訊號傳遞通常需經過數據機（modem）調變與解調變 ④通常採用 CSMA/CA 協定",
   "o": [
    "①②",
    "①③",
    "①②④",
    "③④"
   ],
   "a": 0,
   "exp": "✅ (A) IEEE 802.3 乙太網路①常以 UTP 為傳輸線、②以基頻方式傳送訊號，兩項正確。\n❌ (B) ③區域網路的基頻傳輸不需數據機調變。\n❌ (C) ④802.3 採用的是 CSMA/CD，CSMA/CA 用於無線區域網路（802.11）。\n❌ (D) ③④兩項均有誤。\n📚 出處：IEEE 802.3 乙太網路"
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "比較「以 ADSL modem 連上 Internet」與「以 cable modem 連上 Internet」，下列何者錯誤？",
   "o": [
    "前者多以星狀（star）架構佈建",
    "後者多以匯流排（bus）架構佈建",
    "前者的線材多是採用無遮蔽雙絞線（UTP）",
    "後者的線材多是採用光纖"
   ],
   "a": 3,
   "exp": "✅ (D) cable modem 透過有線電視的同軸電纜（HFC）接取，而非以光纖直接到用戶端，故本項敘述錯誤。\n❌ (A) ADSL 由用戶端各自連回機房，屬星狀架構。\n❌ (B) 有線電視網路採同軸電纜共享，近似匯流排架構。\n❌ (C) ADSL 使用電話線的無遮蔽雙絞線。\n📚 出處：寬頻接取技術的比較"
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何種協定是在資料傳輸時，用以檢視已送達的資料封包中資料是否已毀損，若是則要求對方重新傳送？",
   "o": [
    "檔案傳輸協定",
    "網際網路協定",
    "錯誤更正協定",
    "狀態詢問協定"
   ],
   "a": 2,
   "exp": "✅ (C) 錯誤更正（錯誤控制）協定藉檢查碼偵測封包是否毀損，必要時要求對方重送。\n❌ (A) 檔案傳輸協定處理檔案的傳送與接收。\n❌ (B) 網際網路協定負責定址與路由，本身不保證可靠傳輸。\n❌ (D) 狀態詢問協定非此功能的名稱。\n📚 出處：資料傳輸的錯誤控制"
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列有關 Mobile IP 的敘述何者錯誤？",
   "o": [
    "Mobile node 擁有一個 permanent address，該 address 稱為 home address",
    "若採用 agent advertisement 方式取得目前網路的 foreign agent 的資訊時，mobile node 會等待該 foreign agent發送 router advertisement 封包若採用 agent solicitation 方式取得目前網路的 foreign agent 的資訊時，mobile node 會發送 router discovery",
    "封包去尋找 foreign agent",
    "Mobile node 在 foreign network 取得的 address 稱做 foreign address"
   ],
   "a": 3,
   "exp": "✅ (D) 行動節點在外地網路取得的位址稱為「轉交位址（care-of address）」，並非 foreign address，故本項敘述錯誤。\n❌ (A) 行動節點的永久位址即 home address。\n❌ (B) 採 agent advertisement 時，行動節點等待代理者發送通告封包。\n❌ (C) 採 agent solicitation 時，行動節點主動發送請求封包尋找外地代理者。\n📚 出處：Mobile IP 的運作機制"
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "網路電話需使用下列何種通訊協定？",
   "o": [
    "HTTP（hypertext transfer protocol）",
    "SIP（session initiation protocol）",
    "SSL（secure socket layer）",
    "TELNET（terminal emulation link network）"
   ],
   "a": 1,
   "exp": "✅ (B) SIP 為建立、修改與終止多媒體通話階段的訊令協定，是網路電話（VoIP）的主要協定。\n❌ (A) HTTP 用於網頁資料的傳輸。\n❌ (C) SSL 提供傳輸層的加密保護。\n❌ (D) TELNET 用於遠端終端登入。\n📚 出處：VoIP 與 SIP 協定"
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "在蜂巢式行動電話網路中，下列那一種多工技術直到第三代（3G）方才被普遍採用？",
   "o": [
    "CDMA（Code Division Multiple Access）",
    "TDMA（Time Division Multiple Access）",
    "FDMA（Frequency Division Multiple Access）",
    "CSMA/CD（Carrier Sense Multiple Access with Collision Detection）"
   ],
   "a": 0,
   "exp": "✅ (A) 分碼多工（CDMA）以不同展頻碼區分使用者，自第三代行動通訊起被廣泛採用。\n❌ (B) TDMA 為第二代 GSM 所採用。\n❌ (C) FDMA 為第一代類比系統所採用。\n❌ (D) CSMA/CD 用於有線區域網路，非行動通訊的多工技術。\n📚 出處：行動通訊的多重存取技術"
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "關於資訊安全的維護，下列何種性質，其所指的是資訊在利用、傳輸、儲存等過程中確保其不被竄改、遺失、 缺損？",
   "o": [
    "保密性（confidentiality）",
    "完整性（integrity）",
    "責任性（accountability）",
    "可用性（availability）"
   ],
   "a": 1,
   "exp": "✅ (B) 完整性指確保資訊在使用、傳輸與儲存過程中不被未經授權地竄改、遺失或損毀。\n❌ (A) 保密性指防止資訊被未經授權者知悉。\n❌ (C) 責任性指行為可被追溯到特定主體。\n❌ (D) 可用性指授權者於需要時能即時取用資訊。\n📚 出處：資訊安全的基本性質（CIA）"
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "入侵偵測系統簡稱：",
   "o": [
    "DNS",
    "NFS",
    "IDS",
    "PKS"
   ],
   "a": 2,
   "exp": "✅ (C) 入侵偵測系統的英文為 Intrusion Detection System，縮寫為 IDS。\n❌ (A) DNS 為網域名稱系統。\n❌ (B) NFS 為網路檔案系統。\n❌ (D) PKS 非資安領域的標準縮寫。\n📚 出處：入侵偵測系統（IDS）"
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "因為雲端運算的發展，下列那項攻擊或資安事件較以往更為嚴重？",
   "o": [
    "阻斷服務攻擊（DoS）",
    "分散式阻斷服務攻擊（DDoS）",
    "網路釣魚（phishing）",
    "資料外洩（data leakage）"
   ],
   "a": 3,
   "exp": "✅ (D) 雲端環境將大量資料集中委由第三方保管並以多租戶方式共用資源，一旦防護失效，資料外洩的規模與影響較以往更為嚴重。\n❌ (A) 阻斷服務攻擊在雲端的彈性資源下較易被吸收。\n❌ (B) 分散式阻斷服務同樣可藉雲端的流量清洗緩解。\n❌ (C) 網路釣魚的手法與雲端與否無直接關聯。\n📚 出處：雲端運算的資訊安全風險"
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列 HTML 語法指的是那種功能？ <a href=\"./main.php\">連結</a>",
   "o": [
    "在背景中執行 main.php 程式",
    "編譯 main.php 程式碼",
    "關閉 main.php 網頁",
    "開啟 main.php 網頁"
   ],
   "a": 3,
   "exp": "✅ (D) <a href=\"./main.php\">連結</a> 建立超連結，點選後瀏覽器會開啟（請求）main.php 網頁。\n❌ (A) 超連結不會在背景執行程式。\n❌ (B) 編譯由伺服器端的直譯器處理，與該標籤無關。\n❌ (C) 該標籤不具關閉網頁的功能。\n📚 出處：HTML 超連結標籤"
  }
 ]
};

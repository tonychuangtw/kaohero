/* 106 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-106-1-b023'] = {
 "id": "loc-106-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 106,
 "nth": 1,
 "code": "106190",
 "subj": "b023",
 "title": "106 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "關聯式資料庫（relational database）中有兩個表格為 students 和 takes，這兩個表格只共用屬性 id，當要用此屬性連接兩個表格時，只要取出兩個表格皆出現的資料列（tuple），則應該使用下列那個 SQL指令（根據 ISO 頒布的 SQL 標準語法）？",
   "o": [
    "SELECT * FROM students NATURAL INNER JOIN takes;",
    "SELECT * FROM students LEFT OUTER JOIN takes USING (id);",
    "SELECT * FROM students RIGHT OUTER JOIN takes ON students.id = takes.id;",
    "SELECT * FROM students NATURAL FULL OUTER JOIN takes;"
   ],
   "a": 0,
   "exp": "✅ (A) NATURAL INNER JOIN 依同名屬性 id 自動比對，且只保留兩表皆有的配對列。\n❌ (B) LEFT OUTER JOIN 會保留左表中無配對的列。\n❌ (C) RIGHT OUTER JOIN 會保留右表中無配對的列。\n❌ (D) FULL OUTER JOIN 兩側無配對的列都會保留。\n📚 出處：SQL 的連接運算。"
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於資料庫管理系統中的功能模組？",
   "o": [
    "資料定義語言編譯器（data definition language compiler）",
    "資料操作語言編譯器（data manipulation language compiler）",
    "主體語言編譯器（host language compiler）",
    "程式語言編譯器（programming language compiler）"
   ],
   "a": 3,
   "exp": "✅ (D) 一般程式語言編譯器屬系統軟體，非資料庫管理系統的功能模組。\n❌ (A) DDL 編譯器為 DBMS 的模組。\n❌ (B) DML 編譯器為 DBMS 的模組。\n❌ (C) 主體語言編譯器處理內嵌 SQL 的宿主程式，屬 DBMS 的相關模組。\n📚 出處：資料庫管理系統的架構。"
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列何者是八進制數字 112.4 的十進制表示法？",
   "o": [
    "(78.25)10",
    "(74.5)10",
    "(92.75)10",
    "(70.25)10"
   ],
   "a": 1,
   "exp": "✅ (B) (112.4)₈＝1×64＋1×8＋2＋4/8＝74.5。\n❌ (A) 78.25 與換算結果不符。\n❌ (C) 92.75 與換算結果不符。\n❌ (D) 70.25 與換算結果不符。\n📚 出處：進位制的轉換。"
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "最適合做為外部排序的方法是：",
   "o": [
    "Merge sort",
    "Insert sort",
    "Quick sort",
    "Bubble sort"
   ],
   "a": 0,
   "exp": "✅ (A) 合併排序只須循序讀寫，可分段載入記憶體後合併，最適合外部排序。\n❌ (B) 插入排序須頻繁隨機存取。\n❌ (C) 快速排序的分割需大量隨機存取。\n❌ (D) 氣泡排序效率低且需反覆掃描。\n📚 出處：外部排序。"
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "一個全加器（Full Adder）的邏輯電路，無法透過下列那一個選項的邏輯閘組合而成？",
   "o": [
    "NAND",
    "NOR",
    "AND, OR, XOR",
    "XOR, NOT"
   ],
   "a": 3,
   "exp": "✅ (D) XOR 與 NOT 無法產生 AND／OR 的功能，不構成功能完備集，無法單以其組成全加器。\n❌ (A) NAND 為功能完備閘，可組成任何邏輯電路。\n❌ (B) NOR 亦為功能完備閘。\n❌ (C) AND、OR、XOR 的組合足以實現全加器。\n📚 出處：邏輯閘的功能完備性。"
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "一張 1600×900 像素全彩影像，在不壓縮且不包含其它資訊的情況下，其資料量約為多少 KByte？",
   "o": [
    "1440",
    "2829",
    "4218",
    "5659"
   ],
   "a": 2,
   "exp": "✅ (C) 1600×900×3 bytes＝4,320,000 bytes，除以 1024 約 4,219 KB。\n❌ (A) 1440 係僅以 1 byte/像素計算。\n❌ (B) 2829 與計算結果不符。\n❌ (D) 5659 高於實際資料量。\n📚 出處：全彩影像的資料量計算。"
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "作業系統不提供下列何種服務？",
   "o": [
    "控制 I/O",
    "記憶體分配",
    "CPU 行程監控",
    "偵測病毒入侵"
   ],
   "a": 3,
   "exp": "✅ (D) 病毒偵測由防毒軟體提供，非作業系統的基本服務。\n❌ (A) 控制 I/O 為作業系統的服務。\n❌ (B) 記憶體分配為作業系統的服務。\n❌ (C) 行程管理與監控為作業系統的服務。\n📚 出處：作業系統的功能。"
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "Module-N 計數器如下圖所示，其中(D3D2D1D0)2 表示資料輸入位元，(Q3Q2Q1Q0)2 表示資料輸出位元，其餘控制位元具有下表之操作特性，試問該計數器為何種計數器？Clock Clear0 LoadQ01 CountQ1D0Q2D1 Clear Clock Load Count 功能說明Q3D2 0 × × × Clear to 01 1 × Load input0 D31 0 1 Count next binary state1 0 0 No change",
   "o": [
    "Module-9 計數器",
    "Module-10 計數器",
    "Module-15 計數器",
    "Module-16 計數器"
   ],
   "a": 0
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "採用虛擬記憶體（Virtual memory）的主要目的不包含下列何者？",
   "o": [
    "可提供對程式執行空間的保護",
    "讓多個程式間可以共享記憶體",
    "節省程式執行之功率消耗",
    "使單一程式的程式大小超過系統之主記憶體大小"
   ],
   "a": 2,
   "exp": "✅ (C) 虛擬記憶體須額外進行位址轉換與分頁置換，並不以節省功率為目的。\n❌ (A) 提供位址空間的隔離與保護為其目的。\n❌ (B) 支援行程間共享記憶體為其目的。\n❌ (D) 使程式大小可超越實體記憶體為其核心目的。\n📚 出處：虛擬記憶體。"
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列那一項週邊對於計算機系統上直接記憶體存取（DMA）的機制需求最高？",
   "o": [
    "鍵盤",
    "繪圖卡",
    "滑鼠",
    "遊戲搖桿"
   ],
   "a": 1,
   "exp": "✅ (B) 繪圖卡須高頻寬、大量且連續地搬移影像資料，對 DMA 的需求最高。\n❌ (A) 鍵盤的資料量極小。\n❌ (C) 滑鼠的資料量極小。\n❌ (D) 遊戲搖桿的資料量同樣很小。\n📚 出處：直接記憶體存取（DMA）。"
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列四個數 A=(010 110 011 010)2，B=(2642)8，C=(59B)16，D=(1536)10，其大小關係何者正確？",
   "o": [
    "D>B>C>A",
    "B>C>D>A",
    "D>B>A>C",
    "C>B>D>A"
   ],
   "a": 0,
   "exp": "✅ (A) A＝1434、B＝1442、C＝1435、D＝1536，故 D＞B＞C＞A。\n❌ (B) B 小於 D。\n❌ (C) C 大於 A，順序有誤。\n❌ (D) C 小於 B 與 D。\n📚 出處：各進位制數值的比較。"
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "某嵌入式處理器僅具有加法器（adder）與移位器（shifter），而不具備乘法器。欲執行運算 F=A*10，下列運算方式何者正確？",
   "o": [
    "F=A<<4",
    "F=(A<<3)+(A<<1)",
    "F=A<<5-A<<2",
    "F=A<<3+A<<2"
   ],
   "a": 1,
   "exp": "✅ (B) A×10＝A×8＋A×2＝(A<<3)＋(A<<1)。\n❌ (A) A<<4 等於 A×16。\n❌ (C) 該式的運算次序與結果均不正確。\n❌ (D) (A<<3)＋(A<<2)＝A×12。\n📚 出處：以移位與加法實現乘法。"
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列何者為氣泡排序法（bubble sort）在最糟情況（worst case）下的計算時間複雜度？",
   "o": [
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n2)"
   ],
   "a": 3,
   "exp": "✅ (D) 氣泡排序最壞情況須進行 n(n－1)/2 次比較，複雜度為 O(n²)。\n❌ (A) O(log n) 為二分搜尋的複雜度。\n❌ (B) O(n) 為最佳情況（已排序且設提早結束判斷）。\n❌ (C) O(n log n) 為合併或堆積排序的複雜度。\n📚 出處：排序演算法的複雜度。"
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下圖 expression tree 所表示的運算為何？*+ *x -a bc d",
   "o": [
    "(a+b)*(x*(c-d))",
    "a+b*x*(c-d)",
    "a+b*x+c-d",
    "(a+b)*(x+c)-d"
   ],
   "a": 0,
   "exp": "✅ (A) 該樹以乘法為根，左子樹為 (a＋b)，右子樹為 x 與 (c－d) 的乘積，故為 (a+b)*(x*(c-d))。\n❌ (B) 未反映根節點的括號結構。\n❌ (C) 與樹的層次結構不符。\n❌ (D) 右子樹並非 (x＋c)－d。\n📚 出處：運算式樹的中序還原。"
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "在二元樹中，令 N0 為沒有分枝（branch）的節點（node）個數，N1 為有一個分枝的節點個數，N2 為有二個分枝的節點個數。則下列等式何者正確？",
   "o": [
    "N0＝N2＋1",
    "N0＝N2－1",
    "N1＝N2＋1",
    "N1＝N2－1"
   ],
   "a": 0,
   "exp": "✅ (A) 二元樹中葉節點數等於雙分枝節點數加一，即 N0＝N2＋1。\n❌ (B) 關係式方向相反。\n❌ (C) N1 與 N2 之間並無此一固定關係。\n❌ (D) 同樣不成立。\n📚 出處：二元樹的節點關係。"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "每個陣列在宣告時並不需要那種外顯或隱含的資訊？",
   "o": [
    "陣列的名稱",
    "陣列的資料型態",
    "陣列要儲存的第一個資料值",
    "陣列的索引集合"
   ],
   "a": 2,
   "exp": "✅ (C) 宣告陣列時不需指定要儲存的第一個資料值。\n❌ (A) 陣列名稱為宣告時必要的資訊。\n❌ (B) 資料型態為宣告時必要的資訊。\n❌ (D) 索引集合（大小或範圍）為宣告時必要的資訊。\n📚 出處：陣列的宣告。"
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 2,
   "needfig": true,
   "fig": "img/q/106190_432_2513_17.webp",
   "exp": "✅ (C) 連續 push 後 top＝2；pop() 先將 top 減為 1，再回傳 elements[top+1]＝elements[2]＝'z'。\n❌ (A) 'x' 位於 elements[0]。\n❌ (B) 'y' 位於 elements[1]。\n❌ (D) 堆疊非空，不會回傳 NULL。\n📚 出處：堆疊的 push 與 pop 實作。"
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "關於雙向佇列的敘述，下列何者錯誤？",
   "o": [
    "同時有著堆疊（Stack）和佇列（Queue）的功效可以透過陣列（Array）來實作",
    "可以透過陣列來實作",
    "可以透過雙向鏈結串列（Doubly Linked List）來實作",
    "只可以透過單向鏈結串列（Linked List）來實作"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：雙向佇列亦可用陣列或雙向鏈結串列實作，不限單向鏈結串列（單向串列反而不便於尾端刪除）。\n❌ (A) 敘述正確，兼具堆疊與佇列的功能。\n❌ (B) 敘述正確，可用陣列實作。\n❌ (C) 敘述正確，可用雙向鏈結串列實作。\n📚 出處：雙向佇列（deque）。"
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式碼後，j 的值為何？int i=0,j=2;if (i = 0)j += 1;elsej -= 1;",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 1,
   "exp": "✅ (B) if (i = 0) 為指派運算，其值為 0 即為偽，故執行 else 分支 j －= 1，j 由 2 變為 1。\n❌ (A) j 的初值為 2，不會變為 0。\n❌ (C) 條件式為偽，j 必然改變。\n❌ (D) 3 為條件為真時的結果。\n📚 出處：C 語言中指派與比較運算子的區別。"
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是用來計算最小成本生成樹（minimum-cost spanning tree）的演算法？",
   "o": [
    "克羅斯科法（Kruskal's Algorithm）",
    "普林法（Prim's Algorithm）",
    "索林法（Sollin's Algorithm）",
    "戴克斯楚法（Dijkstra's Algorithm）"
   ],
   "a": 3,
   "exp": "✅ (D) 戴克斯楚法求的是單一起點的最短路徑，非最小成本生成樹。\n❌ (A) Kruskal 演算法用於求最小生成樹。\n❌ (B) Prim 演算法用於求最小生成樹。\n❌ (C) Sollin（Borůvka）演算法用於求最小生成樹。\n📚 出處：圖論演算法。"
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "針對下圖的 graph 以 depth-first traversal 進行探索。下列各節點（vertex）訪問順序中，何者不可能是其訪問順序？g fc a d ebh i kj",
   "o": [
    "a, g, c, b, h, j, i, k, d, e, f",
    "a, g, f, e, d, b, c, h, i, j, k",
    "a, g, d, c, e, f, b, h, i, j, k",
    "a, d, e, f, g, c, b, h, j, i, k"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列何者數值與其他選項不同？",
   "o": [
    "(10111001)2",
    "(B9)16",
    "(271)8",
    "(181)10"
   ],
   "a": 3,
   "exp": "✅ (D) (10111001)₂＝185、(B9)₁₆＝185、(271)₈＝185，只有 (181)₁₀ 為 181。\n❌ (A) 二進位值換算後為 185。\n❌ (B) 十六進位值換算後為 185。\n❌ (C) 八進位值換算後為 185。\n📚 出處：進位制的轉換。"
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int A[4][4]={1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4};int total=0;for(int i=0;i<4;i++)for(int j=0;j<4;j++){if((i+j)>5) break;total+=A[i][j];}cout<<total<<endl;return 0;}",
   "o": [
    "26",
    "30",
    "36",
    "40"
   ],
   "a": 2,
   "exp": "✅ (C) i＝0、1、2 時各列 1＋2＋3＋4＝10；i＝3 時 j＝3 使 i＋j＝6 而 break，僅加 1＋2＋3＝6，合計 36。\n❌ (A) 26 少計一整列。\n❌ (B) 30 未計入 i＝3 的部分和。\n❌ (D) 40 未考慮 break 的中斷。\n📚 出處：巢狀迴圈與 break 的作用範圍。"
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "二元樹尋訪（Traversal）方式有：先序（Pre-order）、中序（In-order）、後序（Post-order）及分支度（Degree，各節點子節點數）。下列那種表示，無法重新建構原二元樹結構？",
   "o": [
    "先序+分支度",
    "先序+中序",
    "後序+中序",
    "先序+後序"
   ],
   "a": 3,
   "exp": "✅ (D) 先序與後序無法區分「只有左子樹」與「只有右子樹」的情形，不足以唯一重建二元樹。\n❌ (A) 先序加上各節點的分支度可唯一重建。\n❌ (B) 先序加中序可唯一重建。\n❌ (C) 後序加中序可唯一重建。\n📚 出處：二元樹的重建。"
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "請問下列 Java 程式的執行結果為何？class B {public int ID;public B( int w) { ID=w; }public B() { this(300); }public void speak() {System.out.println(\"我的編號是\" + ID);}}class C extends B {public String name;public C(String n, int w) {super(w);name = n;}public C() { this(\"小英\", 789); }public void speak() {System.out.println(\"我是\" + name);System.out.println(\"我的編號是\" + ID);}}class A {public static void main(String[] args) {B staff1, staff2;staff1 = new C(\"小明\", 543);staff2 = new C();staff1.speak();staff2.speak();}}",
   "o": [
    "我是小明 我的編號是 543 我是小英 我的編號是 789",
    "我是小明 我的編號是 543 我是小明 我的編號是 300",
    "我是小明 我的編號是 543",
    "我是小明 我的編號是 300"
   ],
   "a": 0,
   "exp": "✅ (A) staff1 為 C(\"小明\", 543)；staff2 的無參數建構式轉呼叫 this(\"小英\", 789)，且 speak() 動態繫結至 C 的版本。\n❌ (B) staff2 的 ID 為 789 而非 300。\n❌ (C) 兩個物件均會輸出。\n❌ (D) 姓名與編號均有誤。\n📚 出處：Java 的建構式鏈結與多型。"
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "在 C 程式語言中，下列那個命令可以立即離開目前正在執行的函數，並且把控制權直接交還給呼叫者？",
   "o": [
    "break",
    "return",
    "continue",
    "while"
   ],
   "a": 1,
   "exp": "✅ (B) return 立即結束目前函數並將控制權交回呼叫者。\n❌ (A) break 僅跳出迴圈或 switch。\n❌ (C) continue 跳至迴圈的下一次疊代。\n❌ (D) while 為迴圈敘述。\n📚 出處：C 語言的流程控制。"
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言執行完畢後，會印出幾個*號？#include<stdio.h>int main(){int i, j;for (i=2, j=3; i<= 2*j; i++, j-=2){printf(\"*\");}return 0;}",
   "o": [
    "6",
    "2",
    "1",
    "3"
   ],
   "a": 2,
   "exp": "✅ (C) 初值 i＝2、j＝3：2≤6 成立印出一個 *，更新為 i＝3、j＝1；3≤2 不成立而結束，共 1 個。\n❌ (A) 6 遠多於實際次數。\n❌ (B) 2 次須第二輪條件成立。\n❌ (D) 3 次同樣不符條件的變化。\n📚 出處：for 迴圈的逗號運算子與條件判斷。"
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "關於 TCP 埠號（port number）使用的敘述，下列何者錯誤？",
   "o": [
    "埠號 80 是 HTTP",
    "埠號 23 是 Telnet",
    "埠號 20 及 21 是 FTP",
    "埠號 26 是 SMTP"
   ],
   "a": 3,
   "exp": "✅ (D) 此項錯誤：SMTP 使用的埠號為 25，非 26。\n❌ (A) HTTP 使用埠號 80。\n❌ (B) Telnet 使用埠號 23。\n❌ (C) FTP 使用埠號 20（資料）與 21（控制）。\n📚 出處：常見服務的公認埠號。"
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列何者是一種宣告式程式語言（declarative programming language）？",
   "o": [
    "Pascal",
    "Prolog",
    "Scheme",
    "Smalltalk"
   ],
   "a": 1,
   "exp": "✅ (B) Prolog 為邏輯式程式語言，屬宣告式典範。\n❌ (A) Pascal 為程序式語言。\n❌ (C) Scheme 為函數式語言，通常與宣告式並列但本題以 Prolog 為典型。\n❌ (D) Smalltalk 為物件導向語言。\n📚 出處：程式語言的典範分類。"
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "執行下列 Java 程式後，產生的輸出為何？class Test{public static void main(String[] args){Test p = new Test();p.start();}void start(){boolean b1 = false;boolean b2 = false;fix(b1);System.out.println(b1 + \" \" + b2);}void fix(boolean b1){b1 = true;}}",
   "o": [
    "false false",
    "false true",
    "true true",
    "true false"
   ],
   "a": 0,
   "exp": "✅ (A) Java 為傳值呼叫，fix() 內對參數的修改不影響呼叫端的 b1，兩者仍為 false。\n❌ (B) b2 未被修改。\n❌ (C) b1 的修改僅限於方法內的區域變數。\n❌ (D) b1 在 start() 中仍為 false。\n📚 出處：Java 的參數傳遞機制。"
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int k=0;for(int i=0;i<5;i++){for(int j=0;j<5;j++){if(j%2) k=k+j;}}cout<< k <<endl;return 0;}",
   "o": [
    "15",
    "20",
    "30",
    "50"
   ],
   "a": 1,
   "exp": "✅ (B) 內層迴圈每輪在 j＝1、3 時累加，合計 4；外層執行 5 次，k＝20。\n❌ (A) 15 為 0 至 5 的和，與條件不符。\n❌ (C) 30 與累加結果不符。\n❌ (D) 50 高於實際值。\n📚 出處：巢狀迴圈與取餘運算。"
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "目前在世界上主要使用的網路通訊協定為何？",
   "o": [
    "TCP/IP",
    "HTTP",
    "UDP",
    "P2P"
   ],
   "a": 0,
   "exp": "✅ (A) TCP/IP 為網際網路的核心通訊協定組。\n❌ (B) HTTP 為應用層協定。\n❌ (C) UDP 為 TCP/IP 中的傳輸層協定之一。\n❌ (D) P2P 為網路架構而非協定。\n📚 出處：TCP/IP 協定組。"
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於編譯式程式語言（compiled language）？",
   "o": [
    "Perl",
    "BASIC",
    "VBScript",
    "C++"
   ],
   "a": 3,
   "exp": "✅ (D) C++ 須經編譯器產生目的碼後執行，屬編譯式語言。\n❌ (A) Perl 為直譯式語言。\n❌ (B) 傳統 BASIC 為直譯式語言。\n❌ (C) VBScript 由直譯器逐行執行。\n📚 出處：編譯式與直譯式語言。"
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "IEEE 802.11 無線網路中，可送出何種訊息來解決隱藏節點（hidden node）的問題？",
   "o": [
    "ACK",
    "RTS/CTS",
    "Beacon",
    "Jamming signal"
   ],
   "a": 1,
   "exp": "✅ (B) RTS/CTS 交握使鄰近節點知悉通道即將被占用，可解決隱藏節點問題。\n❌ (A) ACK 用於確認資料已正確接收。\n❌ (C) Beacon 用於廣播網路資訊與同步。\n❌ (D) Jamming signal 為干擾訊號，屬攻擊手段。\n📚 出處：IEEE 802.11 的 CSMA/CA 與 RTS/CTS。"
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "宣稱實體訊息來源是否與真實實體訊息來源相吻合的過程，為下列何者？",
   "o": [
    "識別性（Identity）",
    "完整性（Integrity）",
    "可用性（Availability）",
    "鑑別性（Authentication）"
   ],
   "a": 3,
   "exp": "✅ (D) 驗證所宣稱的身分是否與真實身分相符，即鑑別性。\n❌ (A) 識別性僅指出主體的身分標識。\n❌ (B) 完整性指資料未遭未授權竄改。\n❌ (C) 可用性指授權者需要時可正常取用。\n📚 出處：資訊安全的基本性質。"
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列何種網路應用協定會建立分開的控制與資料連線？",
   "o": [
    "HTTP",
    "FTP",
    "SMTP",
    "POP3"
   ],
   "a": 1,
   "exp": "✅ (B) FTP 以埠 21 建立控制連線、埠 20 建立資料連線，兩者分開。\n❌ (A) HTTP 在同一連線上傳送請求與回應。\n❌ (C) SMTP 使用單一連線。\n❌ (D) POP3 同樣使用單一連線。\n📚 出處：FTP 的控制連線與資料連線。"
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "對每個網路設備而言，下列何者是獨一無二的？",
   "o": [
    "序號",
    "IP 位址",
    "網卡位址",
    "編號"
   ],
   "a": 2,
   "exp": "✅ (C) 網卡位址（MAC）由製造商燒錄，全球唯一。\n❌ (A) 序號的編法因廠商而異，不保證全球唯一。\n❌ (B) IP 位址可動態配置且私有位址可重複使用。\n❌ (D) 「編號」非網路設備的標準識別。\n📚 出處：MAC 位址。"
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列那個方法不屬於對通行密碼（ID-Password）之安全威脅？",
   "o": [
    "網頁釣魚",
    "社交工程",
    "字典攻擊法",
    "SYN 攻擊法"
   ],
   "a": 3,
   "exp": "✅ (D) SYN 攻擊針對 TCP 連線資源，屬阻斷服務攻擊，非針對密碼的威脅。\n❌ (A) 網頁釣魚誘騙使用者交出帳號密碼。\n❌ (B) 社交工程透過欺騙取得密碼。\n❌ (C) 字典攻擊以常見字彙嘗試破解密碼。\n📚 出處：密碼的安全威脅。"
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "封包過濾式防火牆是第一代防火牆，在封包過濾的過程中，下列何種資訊是它無法檢查的？",
   "o": [
    "來源地的 IP 位址",
    "傳送的資料內容",
    "目的端的傳輸埠",
    "通訊協定種類"
   ],
   "a": 1,
   "exp": "✅ (B) 封包過濾式防火牆僅檢查標頭欄位，無法檢查應用層的資料內容。\n❌ (A) 來源 IP 位址位於標頭，可檢查。\n❌ (C) 目的端埠號位於標頭，可檢查。\n❌ (D) 通訊協定種類位於標頭，可檢查。\n📚 出處：封包過濾式防火牆。"
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "同儕架構（peer-to-peer paradigm）常常被用於檔案分享，下列敘述何者錯誤？",
   "o": [
    "在此架構中，伺服器行程不需要永遠執行與持續等待客戶行程的連線要求，此職責被分擔給所有同儕電腦",
    "無須架設昂貴的伺服器是此架構的優點",
    "同儕架構中，電腦可以為提供服務者，亦可為被服務者，但不可以同時為服務者與被服務者",
    "音樂檔案分享服務 Napster，即屬於同儕架構"
   ],
   "a": 2,
   "exp": "✅ (C) 此項錯誤：同儕架構下同一部電腦可同時扮演服務提供者與接受者。\n❌ (A) 敘述正確，無須常設伺服器持續等待連線。\n❌ (B) 敘述正確，省去昂貴伺服器為其優點。\n❌ (D) 敘述正確，Napster 為著名的同儕檔案分享服務。\n📚 出處：同儕（P2P）架構。"
  }
 ]
};

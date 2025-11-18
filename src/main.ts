// --- 題目一：變數宣告型別定義 ---
// 說明：請為以下變數補上正確型別（數字、字串、布林、字串陣列、帶型別的物件）。
// 目標：能直接通過型別檢查與基本值檢查。

export const plantId: number = 101;
export const plantName: string = "琴葉榕（Fiddle Leaf Fig）";
export const isAvailable: boolean = true;
export const tags: string[] = ["大型植栽", "室內明亮散射光"];
export const plant: { id: number; name: string; price: number } = { id: 101, name: "琴葉榕", price: 2500 };
export const cart: Array<{ sku: string; name: string; qty: number; price: number; potColor?: string }>= [
  { sku: "PLANT-1001", name: "虎尾蘭", qty: 2, price: 480 },
  { sku: "PLANT-2001", name: "龜背芋", qty: 1, price: 1200, potColor: "白" },
];

// --- 題目二：Enum（定義 & 反向映射） ---
// 說明：請定義 PlantCategory Enum，並示範反向映射。
// 目標：理解 Enum 定義與反向映射的寫法。

// 定義方式:
enum weekdays {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday
}

// 用於 function，判斷式 or 型別定義
function checkDay(day: weekdays) {
  switch (day) {
    case weekdays.monday:
      console.log('today is monday');
      break
    case weekdays.tuesday:
      console.log('today is tuesday');
      break
    case weekdays.wednesday:
      console.log('today is wednesday');
      break
      case weekdays.thursday:
      console.log('today is tuesday');
      break
    case weekdays.friday:
      console.log('today is friday');
      break
    case  weekdays.saturday:
      console.log('today is saturday');
      break
    case weekdays.sunday:
      console.log('today is sunday');
      break
    default:
      console.log('error');
      break
  }
}

// 使用:
checkDay(weekdays['monday']); // today is monday

// enum 定義時，如果沒有手動賦值(ex: monday = 1 || monday = '星期一')，那初始值為索引值 0
// 如果手動賦值 (monday = 6)，TS 會自動推斷並依次增加剩餘參數的值 (索引)，如 7、8、9、10...
// 如果手動賦值為字串，因為 TS 無法幫字串進行自動推斷，所以剩餘的參數都需要手動賦值
// 反向映射範例：
// PlantCategory[0] => "LargePlant" 取出字串 
// PlantCategory['LargePlant'] => 0 取出索引


export enum PlantCategory {
  LargePlant
}
export const catKeyName: string = PlantCategory[0];


// --- 題目三：type（& 組合） ---
// 說明：請用 type 定義 BasicPlant 與 StockInfo，再用 & 組合為 OnShelfPlant，建立範例變數。
// 目標：理解 type 宣告與交叉型別的寫法。

export type BasicPlant = { id: number; name: string; price: number };
export type StockInfo = { sku: string; quantity: number };
export type OnShelfPlant = BasicPlant & StockInfo;

export const snakePlant: OnShelfPlant = {
  id: 2,
  name: "虎尾蘭",
  price: 480,
  sku: "PLANT-1001",
  quantity: 42,
};


// --- 題目四：interface（extends 組合） ---
// 說明：定義 Price 與 Shippable，PlantItem 需 extends 兩者並包含 id/name。
// 目標：理解介面擴充多重介面的寫法。
export interface Price {
  price: number;
  currency: string;
}
export interface Shippable {
  weightKg: number;
  shipFrom: string;
}
export interface PlantItem extends Price, Shippable {
  id: number;
  name: string
}

export const fiddleLeafFig: PlantItem = {
  id: 101,
  name: "琴葉榕",
  price: 2500,
  currency: "TWD",
  weightKg: 8.2,
  shipFrom: "Taipei",
};


// --- 題目五：函式定義（以 type 標註參數與回傳） ---
// 說明：定義 CalcTotalFn，計算 items 小計，若有 coupon 則折抵（percent/cash）。
// 目標：以 type 定義函式型別並實作。
export type CartItem = { price: number; qty: number };
export type Coupon = { type: "percent" | "cash"; amount: number };
export type CalcTotalFn = (items: CartItem[], coupon: Coupon) => number;

export const calcTotal: CalcTotalFn = (items, coupon) => {
  const subtotal = items.reduce((sum: number, it: CartItem) => sum + it.price * it.qty, 0);
  if (!coupon) return subtotal; 
  if (coupon.type === "percent") return Math.max(0, Math.round(subtotal * (1 - coupon.amount / 100)));
  return Math.max(0, subtotal - coupon.amount);
};

console.log(calcTotal([{ price: 900, qty: 10 }], { type: "cash", amount: 1 }));



// --- 題目六：Generics + API 應用（使用 axios)  ---
// 說明：import axios 與 AxiosResponse，定義 PlantDTO，實作 fetchPlants。
// API: https://fakestoreapi.com/products
// 目標：理解泛型定義與應用。
import axios from 'axios'; /* TODO: */
type Rating = {
  rate: number,
  count: number
}
export type PlantDTO = { 
  id: number; 
  title: string; 
  price: number; 
  description: string,
  category: string;
  image: string,
  rating: Rating
};

export const fetchPlants = async (): Promise<PlantDTO[]> => {
  return axios.get('https://fakestoreapi.com/products');
}
fetchPlants()
  .then(response => {
    console.log('response: ', response);
  })
  .catch(error => {
    console.error('error: ', error);
  })

// --- 題目七：Required、Partial ---
// 說明：updatePlant(input) 接受部分更新，實際回傳需是 Required<PlantBase>。
// 目標：掌握 Partial/Required 的互補與回傳保證。
export type PlantBase = { id: number; name: string; price: number; description?: string };

export function updatePlant(input: /* TODO */ any): /* TODO */ any {
  const existing: /* TODO */ any = { id: 1, name: "虎尾蘭", price: 480, description: "耐陰、淨化空氣" };
  const merged = { ...existing, ...input };
  return {
    id: merged.id,
    name: merged.name,
    price: merged.price,
    description: merged.description ?? "",
  };
}


// --- 題目八：Record ---
// 說明：用 Record 表示庫存表。
// 目標：以字串鍵對應到嚴格結構。
export type Inventory = /* TODO */ any;
export const inventory /* TODO */ = {
  "PLANT-1001": 42,
  "PLANT-2001": 8,
};

// --- 題目九：Pick、Omit ---
// 說明：type PlantItem 由第四題定義，請用 Pick/Omit 建立兩個新型別。
// 目標：理解 Pick/Omit 的用法與差異。
// 需求：
// 1) CartPlant：只需 id/name/price
// 2) PublicPlant：移除重量與出貨地
export type CartPlant = /* TODO */ any;
export type PublicPlant = /* TODO */ any;

export const cartPlant /* TODO */ = { id: 101, name: "琴葉榕", price: 2500 };
export const publicPlant /* TODO */ = { id: 101, name: "琴葉榕", price: 2500, currency: "TWD" };


// --- 題目十：綜合練習 ---
// 說明：這是一個後台新增商品的功能，請將以下需求用 TypeScript 實作。
/* 1️⃣ 定義 type Product
    產品資料結構如下：
    - id: 字串
    - title: 字串
    - category: 字串
    - description: 字串
    - origin_price: 數字
    - price: 數字
    - is_enabled: 布林
    - unit: 字串 
    - imageUrl: 字串
    - imagesUrl: 字串陣列（非必要）
*/

/*
2️⃣ 定義 type CreateProduct
由 Product 衍生，但不包含 id（使用 Omit）
*/

/*
3️⃣ 定義 type UpdateProduct
由 Product 衍生，id, title 必須有，其餘皆可選（使用 Partial 與 Omit）
*/

/*
4️⃣ 實作函式 submitProduct(type, product)
參數說明：
- type 僅能是 "create" 或 "update"
- 若 type === "create"，參數型別應為 CreateProduct
- 若 type === "update"，參數型別應為 UpdateProduct
函式回傳字串：
create → "新增商品成功：${product.title}"
update → "更新商品成功：${product.id}"
*/

import { useEffect, useContext, useState } from "react";
import { Context } from "./Store";
import axios from "../actions/axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";



const DashboardOrderCreate = () => {

   const { id } = useParams();
   const navigate = useNavigate();

   const [action,setAction] = useState('Add');

   const [ orderCode, setOrderCode] = useState('');
   const [ brand,setBrand] = useState('');
   const [product,setProduct] = useState('');
   const [quantity,setQuantity] = useState(1);
   const [amount,setAmount] = useState(1);
   const [country,setCountry] = useState('');
   const [_state,set_State] = useState('');
   const [style, setStyle] = useState(1);
   const [color , setColor] = useState(1);
   const [customerName,setCustomerName] = useState('');
   const [orderTimeline,setOrderTimeline] = useState(604800);


   const onSubmit = (e) => {
      if(action === 'Add'){
         addOrder(e);
      }else if(action === 'Update'){
         updateOrder(e);
      }else{
         alert('Unexpected Error Occured.');
      }
   }

   const addOrder =  (e) => {
      e.preventDefault();
      let user = localStorage.getItem('user');
      
      if(user){
         axios.post('/auth/user', { userId: user }, {
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(res => {
            console.log('user',res.data);
            axios.post('/order/new', {
               orderCode: orderCode,
               brandName: brand,
               customerName: customerName,
               country: country,
               product: product,
               orderTimeline: orderTimeline,
               style: style,
               color: color,
               state: _state,
               amount:amount,
               quantity:quantity,
               user:res.data._id
            }).then((res) => {
               navigate('/dashboard/orders');
            });

         }).catch((err) => {
            navigate('/logout');
         });
         
      }else{
         navigate('/logout');
      }
      

   };

   const updateOrder = async (e) => {
      e.preventDefault();
      await axios.post('/order/update/'+id , {
         orderCode: orderCode,
         brandName: brand,
         customerName: customerName,
         country: country,
         product: product,
         orderTimeline: orderTimeline,
         style: style,
         color: color,
         state: _state,
      }).then( (res) => {
         navigate('/dashboard/orders');
      });
   }


   const [state, dispatch] = useContext(Context);
   useEffect(_ => {
      dispatch({
         type: "SET_TITLE",
         payload: `Dashboard / Orders / Create`,
      });
   }, []);

   useEffect(() => {
      if(id){
         setAction('Update');
         axios.get('/order/find/'+id).then(
            (response) => {
               if(response.data){
                  setOrderCode(response.data.orderCode);
                  setBrand(response.data.brandName);
                  setProduct(response.data.product);
                  setCountry(response.data.country);
                  set_State(response.data.state);
                  setStyle(response.data.style);
                  setColor(response.data.color);
                  setCustomerName(response.data.customerName);
                  setOrderTimeline(response.data.orderTimeline);
                  setQuantity(response.data.quantity);
                  setAmount(response.data.amount);
               }else{
                  alert('Unexpected Data Occured while fetching department details');
               }
            }
         );
      }
   }, []);

   return (
      <div class="mt-10 sm:mt-0">
         <div class="sm: px-10 md:px-20 lg:px-40 xl:px-64 py-10">
            <div class="mt-5 md:mt-0 md:col-span-2">
               <form onSubmit={onSubmit} method="POST">
                  <div class="shadow overflow-hidden w-full sm:rounded-md">
                     <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">

                           <div class="col-span-6 w-1/2 mx-auto">
                              <label
                                 htmlFor="Order Code"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Order Code
                              </label>
                              <input
                                 type="text"
                                 name="order_code"
                                 id="order_code"
                                 value={orderCode}
                                 onChange={(e) => setOrderCode(e.target.value)} required
                                 autoComplete="order_code"
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>

                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="Customer name"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Customer name
                              </label>
                              <input
                                 type="text"
                                 name="customer_name"
                                 id="customer_name"
                                 value={customerName}
                                 onChange={(e) => {setCustomerName(e.target.value)}} required
                                 autoComplete="customer_name"
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>
                           

                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="Brand name"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Brand name
                              </label>
                              <input
                                 type="text"
                                 name="brand_name"
                                 id="brand_name"
                                 value={brand}
                                 onChange={(e) => setBrand(e.target.value)} required
                                 autoComplete="brand_name"
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>
                           
                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="country"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Country
                              </label>
                              <input
                                 type="text"
                                 name="country"
                                 id="country"
                                 value={country}
                                 onChange={(e) => {setCountry(e.target.value)}} required
                                 autoComplete="customer_name"
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>


                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="state"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 State
                              </label>
                              <input
                                 type="text"
                                 name="state"
                                 id="state"
                                 value={_state}
                                 onChange={(e) => {set_State(e.target.value)}} required
                                 autoComplete="state"
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>


                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="Product type"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Product
                              </label>
                              <input
                                 type="text"
                                 name="Product type"
                                 id="Product type"
                                 value={product}
                                 onChange={(e)=>{setProduct(e.target.value)}} required
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>
                           
                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="Quantity"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Quantity
                              </label>
                              <input
                                 type="number"
                                 min="1"
                                 name="quantity"
                                 id="quantity"
                                 value={quantity}
                                 onChange={(e)=>{setQuantity(e.target.value)}} required
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>
                           
                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="color"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Color
                              </label>
                              <select name="color" required
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                 onChange= {(e) => {setColor(e.target.value)}}>

                                    <option value="1" selected={color===1}>1</option>
                                    <option value="2" selected={color===2}>2</option>
                                    <option value="3" selected={color===3}>3</option>
                                    <option value="4" selected={color===4}>4</option>
                                    <option value="5" selected={color===5}>5</option>
                              </select>
                             
                           </div>
                           

                           <div class="col-span-6 sm:col-span-3">
                              <label
                                 htmlFor="Style"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Style
                              </label>
                              <select name="style"
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                 onChange= {(e) => {setStyle(e.target.value)}} required>

                                    <option value="1" selected={color===1}>1</option>
                                    <option value="2" selected={color===2}>2</option>
                                    <option value="3" selected={color===3}>3</option>
                                    <option value="4" selected={color===4}>4</option>
                                    <option value="5" selected={color===5}>5</option>
                              </select>
                             
                           </div>

                           <div class="col-span-6 sm:col-span-4">
                              <label
                                 htmlFor="Amount"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Amount
                              </label>
                              <input
                                 type="number"
                                 min="1"
                                 name="amount"
                                 id="amount"
                                 value={amount}
                                 onChange={(e)=>{setAmount(e.target.value)}} required
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                           </div>
                           
                           <div class="col-span-6 sm:col-span-4">
                              <label
                                 htmlFor="Order Time"
                                 class="block text-sm font-medium text-gray-700"
                              >
                                 Order Timeline
                              </label>
                              <select name="order_timeline" required
                                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                 onChange= {(e) => {setOrderTimeline(e.target.value)}}>

                                    <option value="604800" selected={(orderTimeline===604800)} >1 week</option>
                                    <option value="1209600" selected={(orderTimeline===1209600)} >2 weeks</option>
                                    <option value="1814400" selected={(orderTimeline===1814400)}>3 weeks</option>
                                    <option value="2419200" selected={(orderTimeline===2419200)}>4 weeks</option>
                              </select>
                             
                           </div>
                           

                           
                        </div>
                     </div>
                     <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                           type="submit"
                           class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                           {action}
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default DashboardOrderCreate;
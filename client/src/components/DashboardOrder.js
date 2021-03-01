import { useEffect, useContext, useState } from "react";
import { Context } from "./Store";
import axios from "../actions/axios";
import { Link, useNavigate } from "react-router-dom";


export default () => {

   const itemsPerPage = 10;
   const [page, setPage] = useState(1);
   const [pages, setPages] = useState(0);
   const [pagesArr, setPagesArr] = useState([]);
   const [totalOrders,setTotalOrders] = useState(0);

   const navigate = useNavigate();
   const [orders, setOrders] = useState(-1);

   const [state, dispatch] = useContext(Context);



   const editOrder = async (order) => {

      navigate('/dashboard/orders/edit/' + order);
   }

   const deleteOrder = async (order) => {

      if (window.confirm('Are you sure you want to delete this order?')) {
         axios.post('/order/delete/' + order, {}, {
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(res => {
            setOrders(orders.filter((ord) => { return ord._id !== order }));
         }).catch((err) => {
            alert('Unexpected error occured while deleting order');
         });
      }

   }


   useEffect(_ => {
      dispatch({
         type: "SET_TITLE",
         payload: `Dashboard / Orders`,
      });
   }, []);

   useEffect(() => {
      setOrders(-1);
      axios.get('/order/sync/' + page).then(
         (response) => {

            setOrders(response.data.docs);
            setPages(Math.ceil(response.data.total / itemsPerPage));
            setTotalOrders(response.data.total);
         }
      );
   }, [page]);

   useEffect(() => {

      if (pages > 0) {
         let newArray = [];
         if (pages <= 10) {
            for (let i = 1; i <= pages; i++) {
               newArray.push(i);
            }
         } else {
            let midStart = page - 2;
            let midEnd = page + 2;

            if (midStart <= 2) {
               midStart = 3
            }
            if (midEnd >= pages - 1) {
               midEnd = pages - 2;
            }
            for (let i = 1; i <= 2; i++) {
               newArray.push(i)
            }
            if (midStart != 3)
               newArray.push(-1);
            for (let i = midStart; i <= midEnd; i++) {
               newArray.push(i);
            }
            if (midEnd !== pages - 2){
               newArray.push(-1);
            }
            for (let i = pages - 1; i <= pages; i++) {
               newArray.push(i);
            }
         }
         setPagesArr(newArray);
      }

   }, [pages, page]);



   return (

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
         <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
               <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-800">
                     Orders
        </h3>
               </div>
               <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link
                     to="/dashboard/orders/create"
                     className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     type="button"
                  >
                     Create New
                  </Link>
               </div>
            </div>
         </div>
         <div className="block w-full overflow-x-auto">


            <table className="items-center w-full bg-transparent border-collapse">
               <thead>
                  <tr>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        #
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Brand
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Customer Name
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Country
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        State
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Style
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Color
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Product
                </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Quantity
                     </th>
                     <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Actions
                     </th>
                     
                  </tr>
               </thead>
               <tbody>
                  {orders === -1 ?
                     <tr>
                        <th
                           className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left" colspan="9"
                        >
                           Loading....
                        </th>
                     </tr>
                     : orders.length > 0 && orders.map((order, index) =>
                        <tr key={index} 
                        className={((new Date()).getTime()) >= ( (order.orderTimeline*1000) + order.startTime)  && 'bg-red-400'}>
                           <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                              {order.orderCode}
                           </th>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.brandName}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.customerName}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.country}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.state}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.style}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.color}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.product}
                           </td>
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                              {order.quantity}
                           </td>
                        
                           <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">

                              <button
                                 className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                 type="button"
                                 onClick={(e) => { e.stopPropagation(); editOrder(order._id) }}
                              >
                                 Edit
                        </button>

                              <button
                                 className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                 type="button"
                                 onClick={(e) => { e.stopPropagation(); deleteOrder(order._id) }}
                              >
                                 Delete
                        </button>
                              <Link
                                 to={`/order/${order._id}`}
                              >
                                 <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                    Track Order
                                 </button>
                              </Link>

                           </td>
                        </tr>
                     )}
               </tbody>
            </table>

            {pages > 0 &&
               <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                     <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                        Previous
                  </a>
                     <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                        Next
                  </a>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                     <div>
                        <p className="text-sm flex gap-x-1 text-gray-700">
                           Showing
                     <span className="font-medium">{(page - 1) * 10 + 1}</span>
                     to
                     <span className="font-medium">{((page - 1) * 10 + 10) > totalOrders ? totalOrders : ((page - 1) * 10 + 10)}</span>
                     of
                     <span className="font-medium">{totalOrders}</span>
                     results
                     </p>
                     </div>
                     <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                           {page - 1 > 0 &&
                              <a onClick={(e) => { e.preventDefault(); setPage(page - 1) }} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                 <span className="sr-only">Previous</span>
                                 <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                 </svg>
                              </a>
                           }

                           {pagesArr.map((pageItem) =>
                              pageItem === -1 ?
                                 <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                 </span> :
                                 <a onClick={(e) => { e.preventDefault(); setPage(pageItem) }} 
                                 className={`${page==pageItem ? 'bg-indigo-500 text-white hover:bg-indigo-600':'text-gray-700 hover:bg-gray-50'} hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium`}>
                                    {pageItem}
                                 </a>
                           )}


                           {page + 1 <= pages &&
                              <a onClick={e => { e.preventDefault(); setPage(page + 1) }} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                 <span className="sr-only">Next</span>
                                 <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                 </svg>
                              </a>
                           }
                        </nav>
                     </div>
                  </div>
               </div>}

         </div>
      </div>

   );
};

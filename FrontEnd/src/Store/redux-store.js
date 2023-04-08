import { configureStore } from "@reduxjs/toolkit";
import UserAthu from "./Userauth";
import AdminAthu from "./Adminauth";

const Store= configureStore(
    {
        reducer:{ user:UserAthu.reducer, Admin:AdminAthu.reducer }
    }
)

export default Store
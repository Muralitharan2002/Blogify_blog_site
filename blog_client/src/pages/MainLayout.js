import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { store } from "../Redux/store.js/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist"

const persistor = persistStore(store)

function MainLayout() {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Header />
                    <Outlet />
                    <Footer />
                </PersistGate>
            </Provider>
        </>
    )
}

export default MainLayout
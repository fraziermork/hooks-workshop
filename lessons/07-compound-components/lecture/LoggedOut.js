import React, { useState, useContext, useMemo, createContext, Children } from "react"

import LoginForm from "app/LoginForm"
import SignupForm from "app/SignupForm"
import About from "app/About"


const TabsContext = createContext({
  activeIndex: 0,
  setActiveIndex: () => {},
});

const TabContext = createContext({
  index: 0,
});

function Tabs({ children }) {
  const [index, setIndex] = useState(0);

  const value = useMemo(() => ({
    activeIndex: index,
    setActiveIndex: setIndex,
  }), [index, setIndex]);

  return (
    <TabsContext.Provider value={value}>
      <div data-reach-tabs>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function Tab({ disabled, children }) {
  const { index } = useContext(TabContext);
  const {
    activeIndex,
    setActiveIndex,
  } = useContext(TabsContext);

  return (
    <div
      data-reach-tab
      key={index}
      className={index === activeIndex ? "active" : ""}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </div>
  );
}

function TabList({ children }) {
  return Children.map(children, (child, i) => (
    <TabContext.Provider value={{ index: i }}>{child}</TabContext.Provider>
  ));
}

function TabPanel({ children }) {
  return children;
}

function TabPanels({ children }) {
  const { index } = useContext(TabContext);
  return (
    <div data-reach-tab-panels>
      {children[index]}
    </div>
  );
}

function LoggedOut() {
  return (
    <div>
      <About />
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel><LoginForm/></TabPanel>
          <TabPanel><SignupForm/></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default LoggedOut;


// function Tabs({ data }) {
//   const [activeIndex, setActiveIndex] = useState(0)

//   return (
//     <div data-reach-tabs>
//       <div data-reach-tab-list>
//         {data.map((tab, index) => {
//           const isActive = index === activeIndex
//           return (
//             <div
//               data-reach-tab
//               key={index}
//               className={isActive ? "active" : ""}
//               onClick={() => setActiveIndex(index)}
//             >
//               {tab.label}
//             </div>
//           )
//         })}
//       </div>
//       <div data-reach-tab-panels>{data[activeIndex].content}</div>
//     </div>
//   )
// }

// export default function LoggedOut() {
//   const tabData = [
//     {
//       label: "Login",
//       content: <LoginForm />
//     },
//     {
//       label: "Signup",
//       content: <SignupForm />
//     }
//   ]

//   return (
//     <div className="LoggedOut">
//       <About />
//       <Tabs data={tabData} />
//     </div>
//   )
// }

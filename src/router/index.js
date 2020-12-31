import Index from "../components/Index";
import HelloWorld from "../components/HelloWorld";
///#
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
const User = {
  template: "<div>User {{ $route.params.id }}</div>",
};

const routesx = [
  { name: "Foo",path: "/foo", component: Foo },
  { name: "Bar",path: "/bar", component: Bar },
  { name: "HelloWorld",path: "/hello", component: HelloWorld },
  { name: "User",path: "/user/:id", component: User },
  { name: "Index",path: "/",component: Index,},
];
/*
const router = new VueRouter({
  routesx // short for `routes: routes`
})
*/
///#
export default {
    mode: "history",
    routes: routesx,
  };
/*
export default {
  mode: "history",
  routes: [
    {
      name: "Index",
      path: "/",
      component: Index,
    },
  ],
};
*/

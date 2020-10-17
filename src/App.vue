<template>
  <div id="app">
    <main class="main">
      <sidebar />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar";

export default {
  name: "App",

  components: {
    Sidebar
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

//reset
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote {
  &:before,
  &:after {
    content: "";
    content: none;
  }
}

q {
  &:before,
  &:after {
    content: "";
    content: none;
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
//reset end

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

.main {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
  max-height: 100vh;
}
</style>

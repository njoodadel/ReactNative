import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MathJax from "react-native-mathjax";

export default function App() {
  return (
    <View style={{ top: 100 }}>
      <MathJax
        html={
          "$sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$<br><p>This is an equation</p>"
        }
      />

      {/* Using Tags */}
      <MathJax
        mathJaxOptions={{ 
          //needed for android 
          extensions:['mml2jax.js',],jax: ['input/MathML', 'output/CommonHTML'],}}  
        html={
          ' <math xmlns = "http://www.w3.org/1998/Math/MathML"> <mrow><mrow><msup> <mi>x</mi> <mn>2</mn> </msup> <mo>+</mo><mrow> <mn>4</mn> <mo>⁢</mo><mi>x</mi> </mrow> <mo>+</mo> <mn>4</mn> </mrow><mo>=</mo><mn>0</mn></mrow></math> this is just a string'
        }
      />

      {/* In Arabic  */}
      <MathJax 
      mathJaxOptions={{
        //needed for android 
         extensions:['mml2jax.js',],jax: ['input/MathML', 'output/CommonHTML'],}}    
        html={
          //style="direction: rtl; to start the equation from the right
          ' هذا نص أول <math style="direction: rtl;" xmlns = "http://www.w3.org/1998/Math/MathML"><mrow dir="rtl"><msup><mi>أ</mi><mn>2</mn></msup><mo>+</mo><msup><mi>ب</mi><mn>2</mn></msup><mo> = </mo><msup><mi>ج</mi><mn>2</mn></msup></mrow></math>  هذا نص ثاني'
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

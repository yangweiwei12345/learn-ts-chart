export default function logger ({getState}){
  // 在这里也可以获取到dispatch的，但是用不到，我们只需要用到getState。
  // logger主要是打印：执行的方法，和oldstate 和 newstate
  return next=> action=>{
    console.log(next,'next')
    console.log('------------')
    const preState= getState()
    console.log('preState',preState)
    console.log('执行的方法：' ,action.type)
    const returnValue = next(action)
    const nextState = getState()
    console.log(nextState)
    console.log('------------')    
    return returnValue
  }
}
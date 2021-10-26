import React, {createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import './App.css';

const clamp = (x,min,max) =>  {return Math.min(Math.max(x,min),max) }
const BaggageContext = createContext()

function Tile(props) {
    
    const canvas = useRef()
    const [shape,setShape,scrolloffset,setscrolloffset,scale,setscale,viewportoffset,setviewportoffset] = useContext(BaggageContext)
    const [style,setstyle] = useState({})
    // const [scale,setscale] = useState(1)

    useEffect(()=> {
        draw()
        // const e = ['gesturechange','']
        const context = canvas.current.getContext('2d')
        context.save()
        canvas.current.addEventListener('wheel',(e)=> {
            e.preventDefault()
        })
        canvas.current.addEventListener('gesturestart',(e)=> {
            e.preventDefault()
            console.log(e,'started')
        })
    },[])

    const pinchMultiplier = 0.025

    const T = (e) => {
        console.log('test 2',e)
    }
    
    const onGesture = (e) => {
        e.preventDefault()
        // pinch and zoom out from where you are pointing
        // console.log(e,'changing',e.scale > 1,scale + (1 - e.scale),clamp((e.scale > 1 ? scale + (e.scale - 1) : scale - (1 - e.scale)),0.15,4))

        // dragging should change scale to e.scale
        // setscale(clamp((e.scale > 1 ? scale + (e.scale - 1) * pinchMultiplier : scale - (1 - e.scale) * pinchMultiplier),0.5,4))
        // setscrolloffset({x:(canvas.current.width/2)/scale - e.clientX,y:(canvas.current.height/2)/scale - e.clientY})
        // console.log((e.clientX - scrolloffset.x) - window.innerWidth/2)
        // const context = canvas.current.getContext('2d')
        
        console.log('triggered ')
        // console.log(e.clientX,canvas.current.width,scale,scrolloffset.x,canvas.current.width/2/scale - e.clientX)

        // context.beginPath()

        // const {x: mx,y: my} = scrolloffset
        // context.fillRect(e.clientX + mx,e.clientY + my,10,10);
        // setscrolloffset({x: 500 - e.clientX, y: e.clientY})
        // setscale(e.scale < scale ? scale - e.scale * 0.01 : scale + e.scale * 0.01)
        // context.translate(2,0)
        // const context = canvas.current.getContext('2d')
        // // setstyle({left:`${e.clientX - (canvas.current.width/2)/scale}px`,top:`${e.clientY - (canvas.current.height/2)/scale}`})
        // console.log((canvas.current.width/2)/scale,e.clientX)
        //e.scale > 1 ? e.scale * pinchMultiplier - scale : e.scale * pinchMultiplier + scale
        // canvas.current.style = {}
        // setstyle({transform:`scale(${scale},${scale}) translate(${e.clientX/2}px,${e.clientY/2}px)`})
        // console.log(scale,style)
        // setscrolloffset({x:scrolloffset.x - (scale * e.clientX) * scale,y: scrolloffset.y  - (scale * e.clientX)})
        // setscale(scale+(e.scale * 0.05))
    }

    useEffect(()=> {
        // canvas.current.addEventListener('touchstart mousedown',(e)=>{console.log('test 2',e)})
        canvas.current.addEventListener('gesturechange',(e)=> {
            // e.preventDefault()
        })
        canvas.current.addEventListener('scroll',(e)=>{
            console.log(e)
        })
        return ()=> {
            canvas.current.removeEventListener('gesturechange',onGesture)
        }
    },[scale,scrolloffset])

    // console.log(props.id,'he')

    const draw = () => {
        const {x,y,width,height,color} = shape
       // console.log(x,y)
       const context = canvas.current.getContext('2d')
       context.resetTransform()
       //    console.log(context.current.scale)
       
       // context.clearRect(x,y,)
       // console.log(data)
       // context.putImageData(data[data.length-1],0,0)
       
       const {x: mx,y: my} = scrolloffset
       const {x: vx,y: vy} = viewportoffset
       // console.log(mx,my)
       context.beginPath();
       
       // if i <= 10 = 0 else 10
       context.fillStyle = color;
       context.scale(scale,scale)
       context.translate(-vx,-vy)
       context.fillRect(x + mx, y + my, width, height);
       context.closePath()
    //    context.translate(mx,my)
       // console.log(x + props.id*1000)
    }
    
    useEffect(()=> {
        draw()
        return () => {
            const context = canvas.current.getContext('2d')
            const {x: mx,y: my} = scrolloffset
            context.resetTransform()
            context.clearRect(0,0,canvas.current.width,canvas.current.height)
            //    console.log(context.getTransform())
            // context.translate(-mx,-my)
            // context.scale(scale,scale)
            // context.restore()
        }
    },[window,shape,scrolloffset,scale])
    
    return (
        <canvas style={style} onClick={T} ref={canvas} width ={window.innerWidth} height={window.innerHeight}  className="layers">
        </canvas>
    )
}

function App() {

    // const [sizeX,sizeY]  = [,3000]
    const main = useRef()

    const [dragging, setdragging] = useState()
    const [offset, setoffset] = useState()
    const [scrolloffset,setscrolloffset] = useState({x:0,y:0})
    const [viewportoffset,setviewportoffset] = useState({x:0,y:0})
    const [scale,setscale] = useState(1)

    const [shape, setShape] = useState(
        // temp shapes dictionary
        {
            id: "0",
            x: 0,
            y: 0,
            width: 250,
            height: 150,
            color: 'green'
        }
    )

    const onWheel = (e) => {
        // onscroll handler
        e.preventDefault()
        const {deltaX: dx, deltaY: dy} = e
        if (e.ctrlKey) {
            // console.log(e)
            // console.log()
            // const {x: mx, y: my} = scrolloffset
            // setscale(e.deltaX)
            // console.log('b',mx,my,scale)

            const {x,y} = viewportoffset

            const newscale = scale + -dy/100
            const oldscale = scale
            const deltascale = newscale - oldscale
            setscale(newscale)

            // console.log(-(e.clientX * -s))
            setviewportoffset({x:x + (-(e.clientX * -deltascale)),y:y + (-(e.clientY * -deltascale))})
            console.log(viewportoffset,newscale,dy)
            // setscrolloffset({x:((e.clientX * scale) - window.innerWidth/2),y:(((e.clientY * scale) - window.innerHeight/2))})
            // console.log('a',mx,my,scale)
        } else {
            const {x: mx, y: my} = scrolloffset
            // const context = canvas.current.getContext('2d')
            // context.translate(50,50)
            setscrolloffset({x:mx+dx,y:my+dy})
        }
        // e.stopImmediatePropagation()
        
        // console.log(scrolloffset)
        // console.log(mouseoffset)
    }

    useEffect(()=> {

        document.addEventListener('wheel',onWheel)
        // document.addEventListener('wheel',(e)=>console.log(e))

        return () => {
            document.removeEventListener('wheel',onWheel)
        }

    },[scrolloffset,scale])
    
    const onMouseDown = (e) => {

        // console.log(ek)
        
        if (dragging) {
            setdragging(false)
            return
        }

        const mouseX = e.clientX / scale
        const mouseY = e.clientY / scale
        const [shapex,shapey] = [shape.x + scrolloffset.x,shape.y + scrolloffset.y]

        // console.log(e.clientX,shape.x+scrolloffset.x,shape.x+scrolloffset.x+shape.width)
        console.log(e.clientX >= shape.x + scrolloffset.x && e.clientX <= shape.x + scrolloffset.x + (shape.width * scale))
        console.log(shapex,shapey,shape.width,shape.height)

        if (mouseX >= shapex && mouseX <= shapex + (shape.width * scale) && mouseY >= shapey && mouseY <= shapey + (shape.height * scale)) {
            setoffset({x:mouseX,y:mouseY})
            // setselected(true)
            setdragging(true)
        }
    }

    const shapeToMouse = useCallback((e)=> {  
        //console.log('moving')
        // console.log(data)
        const {x,y} = offset
        const mouseX = e.clientX / scale
        const mouseY = e.clientY  / scale
        setShape({...shape,
            x: shape.x + mouseX - x, //clamp(shape.x + mouseX - x,0,canvas.current.width - shape.width),
            y: shape.y + mouseY - y//clamp(shape.y + mouseY - y,0,canvas.current.height - shape.height)
        })
        // data.pop()
        // setdata([...data])
    },[offset,scrolloffset])

    useEffect(()=> {
        document.addEventListener('gesturechange',(e)=> {
            // prevent zooming normally
            e.preventDefault()
            // console.log(e)
        })
    },[])

    useEffect(()=> {
        main.current.removeEventListener('mousemove',shapeToMouse)
        if (dragging) {
            main.current.addEventListener('mousemove',shapeToMouse)
        }
    },[offset,dragging])

    const onMouseUp = (e) => {
        //console.log(shape)
        setdragging(false)
    }

    return (
        <div className="App" ref={main} onMouseUp={onMouseUp} onMouseDown={onMouseDown}>
            <BaggageContext.Provider value={[shape, setShape, scrolloffset, setscrolloffset, scale, setscale, viewportoffset, setviewportoffset]}>
                <Tile />
            </BaggageContext.Provider>
        </div>
    );
}

export default App;
/* eslint-disable no-console */
import React, { ElementRef, useEffect, useRef } from 'react'

import Matter from 'matter-js'

/* eslint-disable @typescript-eslint/no-var-requires */
Matter.use(require('matter-wrap'))

declare global {
  interface Window {
    engine: Matter.Engine
    runner: Matter.Runner
  }
}

type Props = {
  containerElement: ElementRef<'div'>
  inView: boolean
}

export default function CapsulePhysics({ containerElement, inView }: Props) {
  const {
    Bodies,
    Engine,
    Events,
    Mouse,
    MouseConstraint,
    Render,
    Runner,
    World,
    Composite,
    Composites,
    Common
  } = Matter

  const canvas = useRef<ElementRef<'canvas'>>(null)
  const world = useRef<Matter.World>()
  const engineRef = useRef<Matter.Engine>()
  const runnerRef = useRef<Matter.Runner>()

  useEffect(() => {
    if (runnerRef.current) {
      Runner.stop(runnerRef.current as Matter.Runner)
      Engine.clear(engineRef.current as Matter.Engine)
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    createWorld()

    return () => {
      Runner.stop(runnerRef.current as Matter.Runner)
      Engine.clear(engineRef.current as Matter.Engine)
    }
  }, [containerElement, canvas, world, Engine, Runner])

  function getValueCategory(value: number) {
    if (value > 1600) {
      return 5
    } else if (value > 1400) {
      return 4
    } else if (value > 768) {
      return 3
    } else {
      return 2
    }
  }

  useEffect(() => {
    const engine = engineRef.current
    if (engine && inView) {
      const heads = [
        'bralia',
        'ekko',
        'isa',
        'kathe',
        'lau',
        'lore',
        'malia',
        'sai'
      ]

      heads.forEach((head) => {
        Composite.add(engine.world, [
          Composites.stack(
            Common.random(20, containerElement.clientWidth),
            Common.random(20, containerElement.clientWidth),
            getValueCategory(containerElement.clientWidth),
            getValueCategory(containerElement.clientWidth),
            0,
            0,
            function (x: number, y: number) {
              return Bodies.rectangle(x, y, 100, 100, {
                chamfer: { radius: 50 },
                render: {
                  sprite: {
                    texture: `/images/sprites/${head}_head.png`,
                    xScale: 1,
                    yScale: 1
                  }
                }
              })
            }
          )
        ])
      })
    }
  }, [
    inView,
    Bodies,
    Common,
    Composite,
    Composites,
    containerElement.clientWidth
  ])

  /* function createImage(string: string) {
    let drawing = document.createElement('canvas') as HTMLCanvasElement

    drawing.width = 150
    drawing.height = 150

    let ctx = drawing.getContext('2d') ?? ({} as CanvasRenderingContext2D)

    ctx.fillStyle = 'transparent'
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.arc(75, 75, 20, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = '10vw ui-sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(string, 75, 85)

    return drawing.toDataURL('image/png')
  } */

  function createWorld() {
    const engine = Engine.create()
    engineRef.current = engine
    world.current = engine.world

    // create a renderer
    const render = Render.create({
      element: containerElement,
      canvas: canvas.current || undefined,
      engine,
      options: {
        width: containerElement.clientWidth,
        height: containerElement.clientHeight,
        background: 'transparent',
        showCollisions: false,
        showVelocity: false,
        showAxes: false,
        wireframes: false
      } as Matter.IRendererOptions
    }) as Matter.Render & { mouse: Matter.Mouse }

    const THICCNESS = 30

    // Ground
    const ground = Bodies.rectangle(
      containerElement.clientWidth / 2,
      containerElement.clientHeight,
      containerElement.clientWidth,
      THICCNESS,
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      }
    )

    // Left Wall
    const leftWall = Bodies.rectangle(
      0,
      containerElement.clientHeight / 2,
      THICCNESS,
      containerElement.clientHeight * 5,
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      }
    )

    // right Wall
    const rightWall = Bodies.rectangle(
      containerElement.clientWidth,
      containerElement.clientHeight / 2,
      THICCNESS,
      containerElement.clientHeight * 5,
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent'
        }
      }
    )

    // walls
    Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall
      /* Bodies.rectangle(300, 200, 200, 50, {
        chamfer: { radius: [25, 25, 0, 0] },
        render: {
          strokeStyle: 'red',
          fillStyle: 'transparent',
          sprite: {
            texture: createImage('NBlaze'),
            xScale: 1,
            yScale: 1
          }
        }
      }) */
    ])

    // MOUSE
    const mouse = Mouse.create(render.canvas)
    render.mouse = mouse
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.5,
        render: {
          visible: true
        }
      } as Matter.IConstraintDefinition
    })

    World.add(engine.world, mouseConstraint)

    let mouseIsDragging = false
    let setIntervalId: ReturnType<typeof setInterval>

    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      mouseIsDragging = true
    })
    Matter.Events.on(mouseConstraint, 'enddrag', () => {
      mouseIsDragging = false
    })
    Matter.Events.on(mouseConstraint, 'mousedown', (ev) => {
      if (mouseIsDragging === false) {
        setIntervalId = setInterval(
          () => {
            createBalls(ev.source.mouse.position)
          },
          (1000 / 60) * 3
        )
      }
    })
    Matter.Events.on(mouseConstraint, 'mouseup', () => {
      clearInterval(setIntervalId)
    })

    //
    //
    // After Update
    //
    //
    Events.on(engine, 'afterUpdate', (ev) => {
      ev.source.world.bodies.forEach((b) => {
        if (
          b.position.x > containerElement.clientWidth ||
          b.position.x < 0 ||
          b.position.y > containerElement.clientHeight
        ) {
          World.remove(engine.world, b)
        }
      })
    })

    function createBalls(positionXY?: Matter.IMousePoint) {
      if (!positionXY) {
        return
      }
    }

    createBalls()

    Render.run(render)

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: containerElement.clientWidth, y: containerElement.clientHeight }
    })

    // create runner
    const runner = Runner.create() as Matter.Runner & {
      correction: number
      counterTimestamp: number
      delta: number
      // deltaHistory: number
      deltaMax: number
      deltaMin: number
      deltaSampleSize: number
      enabled: boolean
      fps: number
      frameCounter: number
      frameRequestId: number
      isFixed: boolean
      timePrev: number
      timeScalePrev: number
    }
    runnerRef.current = runner
    // run the engine
    Runner.run(runner, engine)

    // add To Global
    window.Matter = Matter
    window.engine = engine
    window.runner = runner
  }

  return <canvas className="bg-gray-700" ref={canvas} />
}

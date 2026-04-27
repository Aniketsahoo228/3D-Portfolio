import React, { useMemo, useRef } from "react";
import { cn } from "../../lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}) => {
  return (
    <div className={cn("relative h-full w-full bg-white", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors}
          dotSize={dotSize || 3}
          opacities={opacities}
          shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
            opacity *= step(intro_offset, u_time * animation_speed_factor);
          `}
          center={["x", "y"]}
        />
      </div>

      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
      )}
    </div>
  );
};

const DotMatrix = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
}) => {
  const uniforms = useMemo(() => {
    return {
      u_colors: {
        value: colors.map((c) => [c[0] / 255, c[1] / 255, c[2] / 255]),
        type: "uniform3fv",
      },
      u_opacities: {
        value: opacities,
        type: "uniform1fv",
      },
      u_total_size: {
        value: totalSize,
        type: "uniform1f",
      },
      u_dot_size: {
        value: dotSize,
        type: "uniform1f",
      },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return <Shader source={shaderSource(shader)} uniforms={uniforms} />;
};

const ShaderMaterialComponent = ({ source, uniforms }) => {
  const { size } = useThree();
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 fragCoord;
        uniform vec2 u_resolution;
        void main() {
          gl_Position = vec4(position, 1.0);
          fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
        }
      `,
      fragmentShader: source,
      uniforms: {
        ...convertUniforms(uniforms),
        u_time: { value: 0 },
        u_resolution: {
          value: new THREE.Vector2(size.width * 2, size.height * 2),
        },
      },
      transparent: true,
    });
  }, [size, source, uniforms]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Shader = ({ source, uniforms }) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterialComponent source={source} uniforms={uniforms} />
    </Canvas>
  );
};

function convertUniforms(uniforms) {
  const output = {};
  for (const key in uniforms) {
    output[key] = { value: uniforms[key].value };
  }
  return output;
}

function shaderSource(extraShader) {
  return `
    precision mediump float;
    varying vec2 fragCoord;
    uniform float u_time;
    uniform float u_opacities[10];
    uniform vec3 u_colors[6];
    uniform float u_total_size;
    uniform float u_dot_size;
    uniform vec2 u_resolution;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 st = fragCoord.xy;
      float opacity = 1.0;
      vec2 st2 = floor(st / u_total_size);

      float rand = random(st2);
      opacity *= u_opacities[int(rand * 6.0)];
      vec3 color = u_colors[int(rand * 1.0)];

      ${extraShader}

      gl_FragColor = vec4(color, opacity);
    }
  `;
}
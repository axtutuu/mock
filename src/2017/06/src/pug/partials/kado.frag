#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

// Parameters of outer mandelbox
#define OUTER_FIXED_RADIUS_SQUARE	 2.0
#define OUTER_MIN_RADIUS_SQUARE	 0.55
#define OUTER_FOLDING_LIMIT		 1.05
#define OUTER_SCALE			-2.5

// Parameters of inner mandelbox
#define INNER_FIXED_RADIUS_SQUARE	 2.5
#define INNER_MIN_RADIUS_SQUARE	 0.99
#define INNER_FOLDING_LIMIT		 1.01
#define INNER_SCALE			-2.1

// Parameters of box

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void sphereFold(inout vec3 z, inout float dz, in float fixed_radius_sq, in float min_radius_sq)
{
	float r_sq = dot(z, z);
	if(r_sq < min_radius_sq) {
        	float temp = (fixed_radius_sq / min_radius_sq);
        	z *= temp;
        	dz *= temp;
    	}else if(r_sq < fixed_radius_sq) {
        	float temp = (fixed_radius_sq / r_sq);
        	z *= temp;
        	dz *= temp;
   	}
}

void boxFold(inout vec3 z, in float folding_limit, in float size)
{
    	z = clamp(z, -folding_limit, folding_limit) * size - z;
}

float mandelbox(in vec3 z)
{
	// Inner Mandelbox
	vec3 c = z;
    	float dr_inner = 1.0;
	float inner_scale = INNER_SCALE + 0.10 * sin(time * 0.1);
    	for(int n = 0; n < 15; n++) {
        	boxFold(z, INNER_FOLDING_LIMIT, 2.0);
        	sphereFold(z, dr_inner, INNER_FIXED_RADIUS_SQUARE, INNER_MIN_RADIUS_SQUARE);
        	z = inner_scale * z + c;
        	dr_inner = dr_inner * abs(inner_scale) + 1.0;
    	}
    	float r_inner = length(z) / abs(dr_inner);
	
	
	// Outer Mandelbox
	z = c;
	float dr_outer = 1.0;
	float outer_scale = OUTER_SCALE + 0.12 * sin(time * 0.1);
	for(int n = 0; n < 15; n++) {
        	boxFold(z, OUTER_FOLDING_LIMIT, 2.0);
        	sphereFold(z, dr_outer, OUTER_FIXED_RADIUS_SQUARE, OUTER_MIN_RADIUS_SQUARE);
        	z = outer_scale * z + c;
        	dr_outer = dr_outer * abs(outer_scale) + 1.0;
    	}
    	float r_outer = length(z) / abs(dr_outer);
	
    	return min(r_inner, r_outer);
}

float box(in vec3 p)
{
    	return length(max(abs(p) - vec3(2.0 * 1.047), 0.0));
}

vec3 calcNormalMandelbox(in vec3 p)
{
    	vec2 e = vec2(1.0, -1.0) * 0.5773 * 0.0005;
    	return normalize(e.xyy * mandelbox(p + e.xyy) + 
			 e.yyx * mandelbox(p + e.yyx) + 
			 e.yxy * mandelbox(p + e.yxy) + 
			 e.xxx * mandelbox(p + e.xxx));
}

vec3 calcNormalBox(in vec3 p)
{
    	vec2 e = vec2(1.0, -1.0) * 0.5773 * 0.0005;
    	return normalize(e.xyy * box(p + e.xyy) + 
		     	e.yyx * box(p + e.yyx) + 
		     	e.yxy * box(p + e.yxy) + 
		     	e.xxx * box(p + e.xxx));
}

vec2 castRayToMandelbox(in vec3 ro, in vec3 rd)
{
	float tmin = 1.0;
    	float tmax = 20.0;
    	float t = tmin;
    	float m = -1.0;
    	for(int i = 0; i < 128; i++)
    	{
		vec2 res = vec2(mandelbox(ro + rd * t), 1.0);
        	if(res.x < t / (resolution.y * 2.8) || t > tmax) break;
		t += res.x;
	    	m = res.y;
    	}
    	if(t > tmax) m = -1.0;
    	return vec2(t, m);
}

vec2 castRayToBox(in vec3 ro, in vec3 rd)
{
	float tmin = 1.0;
   	float tmax = 20.0;
    	float t = tmin;
    	float m = -1.0;
    	for(int i = 0; i < 64; i++)
    	{
	    	float precis = 0.0005 * t;
	    	vec2 res = vec2(box(ro + rd * t), 1.0);
        	if(res.x < precis || t > tmax) break;
        	t += res.x;
	    	m = res.y;
    	}
    	if(t > tmax) m = -1.0;
    	return vec2(t, m);
}

vec3 render(in vec3 ro, in vec3 rd)
{   
	vec3 col = vec3(0.7, 0.8, 0.9) + rd.y * 0.8;
    	vec3 lig = normalize(vec3(-0.8, 0.7, 0.6));
    
    	vec2 r_b = castRayToBox(ro, rd);
    
    	if(r_b.y > 0.0) {
        	// box
    		vec3 p_b = ro + r_b.x * rd;
    		vec3 n_b = calcNormalBox(p_b);
        
        	float d_b = clamp(dot(n_b, lig), 0.1, 1.0);
        	float i_b = 1.0;
        
        	// vec3 l_b = vec3(0.0, 0.0, 0.1);
        	vec3 l_b = 0.3 * vec3(0.0, 0.0, 0.5);
        
        	// mandelbox
        	vec2 r_m = castRayToMandelbox(ro, rd);
        	vec3 l_m = vec3(0.0);
        
        	if(r_m.y > 0.0) {
    			vec3 p_m = ro + r_m.x * rd;
    			vec3 n_m = calcNormalMandelbox(p_m);
            		vec3 ref = reflect(rd, n_m);
            
            		i_b = clamp((r_m.x - r_b.x) * 1.8, 0.0, 0.9);
            
            		float d_m = clamp(dot(n_m, n_b), 0.0, 1.0);
        		float a_m = clamp(0.5 + 0.5 * n_m.y, 0.0, 1.0);
            		float i_m = 1.0 - i_b;
            		//float i_m = 1.0;
            
            		l_m += 1.30 * d_m * vec3(-0.2 + 0.75 * sin(0.5 * p_m.x), 0.35 + 0.75 * sin(p_m.y * 0.2), 0.25) * i_m;
            		l_m += 0.30 * a_m * vec3(0.10, 0.10, 0.25) * i_m;
        	}
		
        // composit
        col = col * ((1.0 - d_b) * l_b + d_b * l_m);
	}
	
    	return vec3(clamp(col, 0.0, 1.0));
}

mat3 setCamera(in vec3 ro, in vec3 ta, float cr)
{
	vec3 cw = normalize(ta - ro);
	vec3 cp = vec3(sin(cr), cos(cr), 0.0);
	vec3 cu = normalize(cross(cw, cp));
	vec3 cv = normalize(cross(cu, cw));
    	return mat3(cu, cv, cw);
}

void main(void)
{
	vec3 col = vec3(0.0);
	float stime = sin(time * 0.1); 
	float ctime = cos(time * 0.1); 
    
	vec2 p = (-resolution.xy + 2.0 * gl_FragCoord.xy) / resolution.y;
    	// vec3 ro = vec3(0.0, 1.0, 10.0);
    	vec3 ro = vec3(10.0 * stime, 2.0 * ctime, 15.0 + 1.0 * stime);
    	vec3 ta = vec3(0.0, 0.0, 0.0);
    
    	mat3 ca = setCamera(ro, ta, 0.05);
    	vec3 rd = ca * normalize(vec3(p.xy, 6.0));
    
    	col = render(ro, rd);
	
	// Post-processing
    	col = pow(col, vec3(0.4545));
    
	gl_FragColor = vec4(col,1.0);
}














//     #extension GL_EXT_shader_texture_lod : enable
//     precision highp float;
//     // uniforms
//     uniform float time;
//     uniform vec2 mouse;
//     uniform vec2 resolution;
//     uniform samplerCube textureCube;
//     uniform sampler2D groundHeight;
//     uniform bool debugCamera;
//     uniform vec3 cameraPos;
//     uniform vec3 cameraDir;
//     // uniform float kadoScale;
//     float kadoScale;
//     // consts
//     const float INF = 1e+10;
//     const float EPS = 1e-2;
//     const float EPS_N = 1e-3;
//     const float OFFSET = EPS * 100.0;
//     const float PI = 3.14159265359;
//     const float PI2 = 6.28318530718;
//     const float PIH = 1.57079632679;
//     const float PIQ = 0.78539816339;
//     const float GROUND_BASE = 5.5;
//     // globals
//     const vec3 lightDir = vec3( -0.48666426339228763, 0.8111071056538127, -0.3244428422615251 );
//     float lTime;
//     // ray
//     struct Ray {
//     	vec3 origin;
//     	vec3 direction;
//     };
//     // camera
//     struct Camera {
//     	vec3 eye, target;
//     	vec3 forward, right, up;
//     	float zoom;
//     };
//     Ray cameraShootRay(Camera c, vec2 uv) {
//     	c.forward = normalize(c.target - c.eye);
//     	c.right = normalize(cross(c.forward, c.up));
//     	c.up = normalize(cross(c.right, c.forward));
//     	Ray r;
//     	r.origin = c.eye;
//     	r.direction = normalize(uv.x * c.right + uv.y * c.up + c.zoom * c.forward);
//     	return r;
//     }
//     // intersection
//     struct Intersection {
//     	bool hit;
//     	vec3 position;
//     	float distance;
//     	vec3 normal;
//     	vec2 uv;
//     	float count;
//     	int material;
//     	vec3 color;
//     	float reflectance;
//     };
//     #define METAL_MATERIAL   0
//     #define GROUND_MATERIAL  1
//     // util
//     #define saturate(x) clamp(x, 0.0, 1.0)
//     // Distance Functions
//     float sdBox( vec3 p, vec3 b ) {
//       vec3 d = abs(p) - b;
//       return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
//     }
//     #define WORK_TIME (60.0)
//     // http://blog.hvidtfeldts.net/index.php/2011/11/distance-estimated-3d-fractals-vi-the-mandelbox/
//     float minRadius2 = 0.5;
//     float fixedRadius2 = 1.0;
//     float foldingLimit = 1.0;
//     #define Iterations 8
//     void sphereFold(inout vec3 z, inout float dz) {
//     	float r2 = dot(z,z);
//     	if (r2 < minRadius2) {
//     		// linear inner scaling
//     		float temp = (fixedRadius2 / minRadius2);
//     		z *= temp;
//     		dz *= temp;
//     	} else if (r2 < fixedRadius2) {
//     		// this is the actual sphere inversion
//     		float temp = fixedRadius2 / r2;
//     		z *= temp;
//     		dz *= temp;
//     	}
//     }
//     void boxFold(inout vec3 z, inout float dz) {
//     	z = clamp(z, -foldingLimit, foldingLimit) * 2.0 - z;
//     }
//     float dMbox(vec3 z) {
//     	vec3 offset = z;
//     	float dr = 1.0;
//     	for (int n = 0; n < Iterations; n++) {
//     		boxFold(z, dr);       // Reflect
//     		sphereFold(z, dr);    // Sphere Inversion
//     		z = kadoScale * z + offset;  // Scale & Translate
//     		dr = dr * abs(kadoScale) + 1.0;
//     	}
//     	float r = length(z);
//     	return r / abs(dr);
//     }
//     float dScene(vec3 p) {
//     	return dMbox(p);
//     }
//     // color functions
//     vec3 hsv2rgb(vec3 c) {
//     	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//     	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//     	return c.z * mix(K.xxx, saturate(p - K.xxx), c.y);
//     }
//     #define calcNormal(p, dFunc) normalize(vec2(EPS_N, -EPS_N).xyy * dFunc(p + vec2(EPS_N, -EPS_N).xyy) + vec2(EPS_N, -EPS_N).yyx * dFunc(p + vec2(EPS_N, -EPS_N).yyx ) + vec2(EPS_N, -EPS_N).yxy * dFunc(p + vec2(EPS_N, -EPS_N).yxy) + vec2(EPS_N, -EPS_N).xxx * dFunc(p + vec2(EPS_N, -EPS_N).xxx))
//     float sdGround(in vec3 p) {
//     	return p.y - texture2D(groundHeight, p.xz * 0.1).r + GROUND_BASE;
//     }
//     // 近くはレイマーチングによって正確に衝突判定し、遠くは平面として衝突判定を行う
//     void intersectGround(inout Intersection intersection, inout Ray ray) {
//     	float d;
//     	float distance = 0.0;
//     	vec3 p = ray.origin;
//     	for (float i = 0.0; i < 10.0; i++) {
//     		d = sdGround(p);
//     		distance += d;
//     		p = ray.origin + distance * ray.direction;
//     		intersection.count = i;
//     		if (abs(d) < EPS) break;
//     	}
//     	if (abs(d) < EPS) {
//     		intersection.distance = distance;
//     		intersection.hit = true;
//     		intersection.position = p;
//     		intersection.normal = calcNormal(p, sdGround);
//     		intersection.material = GROUND_MATERIAL;
//     	} else {
//     		float t = -(ray.origin.y + GROUND_BASE) / ray.direction.y;
//     		if (t > 0.0) {
//     			intersection.distance = t;
//     			intersection.hit = true;
//     			intersection.position = ray.origin + t * ray.direction;
//     			intersection.normal = mix(calcNormal(intersection.position, sdGround), vec3(0.0, 1.0, 0.0), min(t * 0.01, 1.0) - ray.direction.y);
//     			intersection.material = GROUND_MATERIAL;
//     		}
//     	}
//     }
//     void intersectObjects(inout Intersection intersection, inout Ray ray) {
//     	float d;
//     	float distance = 0.0;
//     	vec3 p = ray.origin;
//     	for (float i = 0.0; i < 100.0; i++) {
//     		d = dScene(p);
//     		distance += d;
//     		p = ray.origin + distance * ray.direction;
//     		intersection.count = i;
//     		if (abs(d) < EPS || distance > 100.0) break;
//     	}
//     	if (abs(d) < EPS && distance < intersection.distance) {
//     		intersection.distance = distance;
//     		intersection.hit = true;
//     		intersection.position = p;
//     		intersection.normal = calcNormal(p, dScene);
//     		intersection.material = METAL_MATERIAL;
//     	}
//     }
//     void intersectScene(inout Intersection intersection, inout Ray ray) {
//     	intersection.distance = INF;
//     	intersectGround(intersection, ray);
//     	intersectObjects(intersection, ray);
//     }
//     float calcAo(in vec3 p, in vec3 n){
//     	float sca = 1.0, occ = 0.0;
//     	for(float i=0.; i<5.; i++){
//     		float hr = 0.05 + i * 0.08;
//     		float dd = dScene(n * hr + p);
//     		occ += (hr - dd) * sca;
//     		sca *= 0.5;
//     	}
//     	return saturate(1.0 - occ);
//     }
//     float calcShadow(in vec3 p, in vec3 rd) {
//     	float d;
//     	float distance = OFFSET;
//     	float bright = 1.0;
//     	float shadowIntensity = 0.4;
//     	float shadowSharpness = 10.0;
//     	for (int i = 0; i < 30; i++) {
//     		d = dScene(p + rd * distance);
//     		if (d < EPS) return shadowIntensity;
//     		bright = min(bright, shadowSharpness * d / distance);
//     		distance += d;
//     	}
//     	return shadowIntensity + (1.0 - shadowIntensity) * bright;
//     }
//     void calcRadiance(inout Intersection intersection, inout Ray ray, int bounce) {
//     	intersection.hit = false;
//     	intersectScene(intersection, ray);
//     	if ( intersection.hit ) {
//     		float diffuse = clamp(dot(lightDir, intersection.normal), 0.2, 1.0) * 0.5 + 0.5;
//     		float specular = pow(saturate(dot(reflect(lightDir, intersection.normal), ray.direction)), 10.0);
//     		float ao = calcAo(intersection.position, intersection.normal);
//     		float shadow = calcShadow(intersection.position, lightDir);
//     		if (intersection.material == METAL_MATERIAL) {
//     			vec3 metalBase = hsv2rgb(vec3(0.1 * intersection.count + sin(0.05 * PI2 * lTime), 0.7 * 0.5 + abs(0.05 * PI2 * sin(0.1 * lTime)), 0.9));
//     			intersection.color = metalBase * diffuse * ao * shadow + 0.1 * specular;
//     			intersection.reflectance = 0.7;
//     		} else {
//     			vec3 metalBase = vec3(0.17, 0.25, 0.28);
//     			intersection.color = metalBase * diffuse * ao * shadow + 0.5 * specular;
//     			float f0 = 0.7;
//     			intersection.reflectance = f0 + (1.0 - f0) * pow(1.0 + ray.direction.y, 5.0);
//     		}
//     	} else {
//     		intersection.color = textureCubeLodEXT(textureCube, ray.direction, 0.0).rgb;
//     	}
//     }
//     void main(void) {
//     	// set globals
//     	lTime = mod(time, WORK_TIME);
//     	kadoScale = 2.6 + 0.2 * cos(0.1 * PI2 * time);
//     	// fragment position
//     	vec2 uv = ( gl_FragCoord.xy * 2.0 - resolution ) / min( resolution.x, resolution.y );
//     	// camera and ray
//     	Camera camera;
//     	camera.eye    = cameraPos;
//     	camera.target = cameraPos + cameraDir;
//     	camera.up = vec3(0.0, 1.0, 0.0);// y-up
//     	camera.zoom = 2.0;
//     	Ray ray = cameraShootRay(camera, uv);
//     	vec3 color = vec3(0.0);
//     	float reflection = 1.0;
//     	Intersection intersection;
//     	for (int bounce = 0; bounce <= 2; bounce++) {
//     		calcRadiance(intersection, ray, bounce);
//     		color += reflection * intersection.color;
//     		if (!intersection.hit) break;
//     		reflection *= intersection.reflectance;
//     		ray.origin = intersection.position + intersection.normal * OFFSET;
//     		ray.direction = normalize(reflect(ray.direction, intersection.normal));
//     	}
//     	gl_FragColor = vec4(color, 1.0);
//     }

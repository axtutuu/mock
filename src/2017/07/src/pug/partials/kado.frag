			uniform sampler2D tex1;
			varying float vAlpha;
			void main() {
				gl_FragColor = texture2D( tex1, gl_PointCoord );
				gl_FragColor.r = ( 1.0 - gl_FragColor.r ) * vAlpha + gl_FragColor.r;
			}

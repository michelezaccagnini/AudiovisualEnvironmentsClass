#define MIDI_IN iChannel0
#define BUF_A iChannel1
#define FEEDB iChannel2


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-iResolution.xy*0.5)/iResolution.y;
    ivec2 iCoo = ivec2(fragCoord);

    vec3 col = vec3(0);

    vec4 cc_data = texelFetch(BUF_A, ivec2(0,1),0);

    float d = Dot(uv, vec2(fract(iTime),cc_data.x),0.1);
    col = d*vec3(1);


    
    fragColor = vec4(col,1);
}
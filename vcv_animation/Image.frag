#define MIDI_IN iChannel0
#define BUF_A iChannel1
#define BUF_B iChannel2

//just sample texture from Buffer B

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (fragCoord-iResolution.xy*0.5)/iResolution.y;
    ivec2 iCoo = ivec2(fragCoord);

    vec3 col = texture(BUF_B,fragCoord/iResolution.xy).xyz;

    //col = texelFetch(BUF_A, ivec2(0,0),0).zzz;

   

    // Output to screen
    fragColor = vec4(col,1.0);
}
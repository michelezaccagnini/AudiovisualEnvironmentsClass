#define MIDI_IN iChannel0
#define BUF_A iChannel1
#define FEEDB iChannel2

//draw dots on screen, motion is drawn from accumulated envelope, color from pitch
//we draw it on a buffer so we can apply feedback (trails), not possible on Image

vec2 getPath(vec4 note_data, float offset)
{
    float env_accum  = note_data.z;
    return vec2(cos(env_accum+offset),sin(env_accum+offset));
    
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (fragCoord-iResolution.xy*0.5)/iResolution.y;
    ivec2 iCoo = ivec2(fragCoord);

    vec3 col = vec3(0);

    for(int id = 0; id < 2; id++)
    {
        vec4 note_data = texelFetch(BUF_A,ivec2(id,0),0);
        vec4 cc_data   = texelFetch(BUF_A,ivec2(id,1),0);
        vec2 pos = getPath(note_data, float(id));
        float rad = texelFetch(BUF_A,ivec2(id,1),0).x*0.1+0.01;
        float d = Dot(uv*3., pos, rad);
        vec3 dot_col = hash31(note_data.y);
        col += d*dot_col*note_data.x;
        //col = max(col,d*dot_col);

    }
   
    vec3 feed = texture(FEEDB,fragCoord/iResolution.xy).xyz;
    col = max(col,feed*0.8);
    //col = texelFetch(BUF_A,ivec2(fragCoord*0.01),0).xxx;

    fragColor = vec4(col,1);//texelFetch(BUF_A,ivec2(0),0);//
}
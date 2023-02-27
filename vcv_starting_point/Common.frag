#define HEIGHT_CH_BLOCK 5

#define NUM_NOTES 5
#define NUM_DRUMS 3

const int NUM_TOT_EVENTS = NUM_DRUMS + NUM_NOTES;

float getCCval (int CC, int channel,sampler2D midi_data)

{   
    //add 1 to the channel to make it start from 1   
    int   yco = channel*HEIGHT_CH_BLOCK-2;   
    ivec2 coo = ivec2(CC, yco);   
    float ccv = texelFetch(midi_data, coo,0).x;   
    return ccv;
}

float getEnvelope(int ptc, int cha, float last_vel, float dur,sampler2D midi_data) 
{
    ivec2 coo = ivec2(ptc, cha * HEIGHT_CH_BLOCK);
    //Midi input texture: x coor= pitch; 
    //y coor = 5 rows per channel: vel, secs since on, secs since off, ...
    float vel = texelFetch(midi_data, coo, 0).x;
    float secs_on = texelFetch(midi_data, coo + ivec2(0, 1), 0).x;
    float secs_off = texelFetch(midi_data, coo + ivec2(0, 2), 0).x;
    bool  trigg = secs_on < secs_off || secs_off < 0.;
    float env = 0.;
    if(trigg) env = 1.;
    else env = mix(last_vel,0., 1./dur);
    return env;
}

vec3 hash31( float n )
{
    return fract(sin(vec3(n,n+1.0,n+2.0))*vec3(43758.5453123,22578.1459123,19642.3490423));
}

float Dot(vec2 uv, vec2 pos, float rad)
{
    float d = length(uv-pos)-rad;
    return step(d,rad);
}
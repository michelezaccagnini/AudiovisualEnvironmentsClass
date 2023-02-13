#define MIDI_IN iChannel0
#define FEEDB iChannel1



//MIDI data parsing and assignment: each pixel contains data of one of the voices
//INPUT CHANNELS: channel 1 and 2
//INPUT CC : 20 -> pitch, 1 -> envelope
//OUTPUTS PIXELS: pix(0,0), pix(1,0)
//OUTPUTS on single pixel:
                    //pix.x : current envelope 
                    //pix.y : pitch
                    //pix.z :  accumulated envelope

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    ivec2 iCoo = ivec2(fragCoord);
    if(any(greaterThan(iCoo,ivec2(NUM_TOT_EVENTS,1)))) discard;
    float cc_pitch = 0.;
    float cc_env = 0.;
    vec4 last_data =  texelFetch(FEEDB,iCoo,0);
    int channel = iCoo.x+1;
    if(iCoo.y == 0)
    {
        cc_pitch = getCCval(21,channel,MIDI_IN);
        cc_env = getCCval(20,channel,MIDI_IN);
        last_data =  texelFetch(FEEDB,iCoo,0);
        fragColor = vec4(cc_env,cc_pitch,cc_env*0.1+last_data.z,1);
    }
    else
    {
        float cc1 = getCCval(22,channel,MIDI_IN);
        float cc2 = getCCval(23,channel,MIDI_IN);
        float cc3 = getCCval(24,channel,MIDI_IN);
        float cc4 = getCCval(25,channel,MIDI_IN);
        fragColor = vec4(cc1,cc2,cc3,cc4);
    }


    float midi = texelFetch(MIDI_IN,iCoo,0).x;
    //fragColor = vec4(midi);
}

export function Dialog(entity, discussion, scene)
{
    switch (config.default.gameData.stage)
    {
        case 'Sea Stadium':
        switch(entity)
        {
            case 'Krissy': 
                if (discussion.Krissy === false) 
                { 
                    discussion.Krissy = true;
                    scene.scene.get('Main').npcGlow.forEach(i => i.setVisible(true));
                    scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Krissy')
                            i.setVisible(false);
                    });
                }
                else
                {
                    for (let [i, j] of Object.entries(discussion)) //if all discussions are true
                    {
                        if (j === false) return;
                        if (
                            discussion.Ryan === true && 
                            discussion.Sean === true && 
                            discussion.Nora === true && 
                            discussion.Ronayne === true && 
                            discussion.Dave === true && 
                            discussion.Eric === true && 
                            discussion.Luke === true
                        )
                        {
                            scene.scene.get('Main').npcGlow.filter(i => {
                                discussion.Becca = true;
                                if (i.data.list.name === 'Krissy')
                                    i.setVisible(true);
                            })
                        }
                        Entity.NPCS.filter(i => {
                            if (i.name === 'Krissy')
                            {
                                i.message1 = "Thanks so much, you're a lifesaver. Go talk to my bud at the merch booth and he'll hook you up with something on me.";
                                i.message2 = i.message1;
                            }
                        });
                    }
                }
                break;
                case 'Ryan':   
                    if (discussion.Krissy === true) this.discussion('Ryan'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Ryan') 
                            i.setVisible(false);  
                    });
                break;
                case 'Becca': 
                    if (discussion.Becca === true)
                    {
                        player.avatar.setTexture('red_blueGuy'); alert('ok')
                    } 
                break;
                case 'Sean': 
                    if (discussion.Krissy === true) this.discussion('Sean'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Sean') 
                            i.setVisible(false);
                    });
                break;
                case 'Nora': 
                    if (discussion.Krissy === true) this.discussion('Nora'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Nora') 
                            i.setVisible(false);
                    });
                break;
                case 'Ronayne': 
                    if (discussion.Krissy === true) this.discussion('Ronayne'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Ronayne') 
                            i.setVisible(false);
                    });
                break;
                case 'Dave': 
                    if (discussion.Krissy === true) this.discussion('Dave'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Dave') 
                            i.setVisible(false);
                    });
                break;
                case 'Eric': 
                    if (discussion.Krissy === true) this.discussion('Eric'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Eric') 
                            i.setVisible(false);
                    });
                break;
                case 'Luke': 
                    if (discussion.Krissy === true) this.discussion('Luke'); 
                    this.glow = scene.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Luke') 
                            i.setVisible(false);
                    });
                break;
        }
        break;
    }
}
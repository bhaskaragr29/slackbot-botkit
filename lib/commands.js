module.exports = [
    {
        command: 'help',
        slack_text: '`help` - Print commands'
    },
    {
        command: 'search',
        slack_text: '`search <query>` - List 10 tracks that match query'
    },
    {
        command: 'choose<1-10>',
        slack_text: '`choose <1-10>` - Select track from search selection to add to playlist'
    },
    {
        command: 'tracks',
        slack_text: '`tracks|list` - Show tracks in playlist'
    },{
        command: 'play',
        slack_text: '`play|pause|resume|stop` - Control playback'
    },
    {
        command: 'search',
        slack_text: '`play <track number>` - Play a given track from the playlist'
    },{
        command: 'help',
        slack_text: '`clear` - Remove all tracks and stop playback'
    },
    {
        command: 'search',
        slack_text: '`vol|volume` - Get current volume level'
    },{
        command: 'help',
        slack_text: '`help` - Print commands'
    },
    {
        command: 'search',
        slack_text: '`vol|volume up|down|0-100` - Set volume level'
    },
];
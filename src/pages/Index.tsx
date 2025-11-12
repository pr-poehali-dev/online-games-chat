import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  viewers: string;
  streamer: string;
  platform: 'twitch' | 'youtube';
  thumbnail: string;
  isLive: boolean;
}

interface Message {
  id: number;
  user: string;
  text: string;
  avatar: string;
  timestamp: string;
}

const Index = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'ProGamer',
      text: 'Кто идёт играть в CS2?',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      timestamp: '14:23'
    },
    {
      id: 2,
      user: 'StreamKing',
      text: 'Смотрю стрим на Twitch, зацените!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      timestamp: '14:25'
    },
    {
      id: 3,
      user: 'GamerGirl',
      text: 'Dota 2 сейчас огонь 🔥',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Princess',
      timestamp: '14:27'
    }
  ]);

  const games: Game[] = [
    {
      id: 1,
      title: 'Counter-Strike 2',
      viewers: '248K',
      streamer: 's1mple',
      platform: 'twitch',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: 2,
      title: 'Dota 2',
      viewers: '156K',
      streamer: 'Dendi',
      platform: 'twitch',
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: 3,
      title: 'Valorant',
      viewers: '89K',
      streamer: 'TenZ',
      platform: 'youtube',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: 4,
      title: 'League of Legends',
      viewers: '312K',
      streamer: 'Faker',
      platform: 'twitch',
      thumbnail: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=225&fit=crop',
      isLive: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: 'Вы',
        text: message,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameHub
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Radio" className="text-secondary animate-pulse-glow" size={28} />
                Популярные стримы
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  Топ
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} className="mr-1" />
                  Фильтр
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {games.map((game) => (
                <Card 
                  key={game.id} 
                  className="overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group bg-card border-border animate-slide-up"
                  style={{ animationDelay: `${game.id * 0.1}s` }}
                >
                  <div className="relative">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                    {game.isLive && (
                      <Badge className="absolute top-3 left-3 bg-red-600 text-white animate-pulse-glow">
                        <Icon name="Radio" size={12} className="mr-1" />
                        LIVE
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="backdrop-blur-sm bg-black/50">
                        <Icon 
                          name={game.platform === 'twitch' ? 'Tv' : 'Youtube'} 
                          size={12} 
                          className="mr-1" 
                        />
                        {game.platform}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <Icon name="Eye" size={14} className="text-red-500" />
                      <span className="text-sm font-semibold text-white">{game.viewers}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${game.streamer}`} />
                        <AvatarFallback>{game.streamer[0]}</AvatarFallback>
                      </Avatar>
                      <span>{game.streamer}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-180px)] flex flex-col bg-card border-border">
              <div className="p-4 border-b border-border flex items-center justify-between bg-card/50">
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" className="text-primary" size={24} />
                  <h3 className="font-bold text-lg">Чат</h3>
                </div>
                <Badge variant="secondary" className="animate-fade-in">
                  {messages.length} сообщений
                </Badge>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className="flex gap-3 animate-slide-up hover:bg-accent/10 p-2 rounded-lg transition-colors"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-sm">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Написать сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="Smile" size={14} className="mr-1" />
                    Эмодзи
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="Image" size={14} className="mr-1" />
                    GIF
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

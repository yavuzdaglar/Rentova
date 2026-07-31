import React from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, MessageSquare, Trash2, Send } from 'lucide-react';
import { AdminMessage } from '../../types';

interface MessagesProps {
  mockAdminMessages: AdminMessage[];
  selectedMsg: AdminMessage | null;
  setSelectedMsg: (msg: AdminMessage | null) => void;
  msgFilter: 'all' | 'toxic' | 'normal';
  setMsgFilter: (filter: 'all' | 'toxic' | 'normal') => void;
  msgPage: number;
  setMsgPage: (page: number) => void;
}

const Messages: React.FC<MessagesProps> = ({
  mockAdminMessages,
  selectedMsg,
  setSelectedMsg,
  msgFilter,
  setMsgFilter,
  msgPage,
  setMsgPage
}) => {
  const itemsPerPage = 8;

  return (
    <motion.div
      key="messages"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Selected Message Content & Reply Box */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-[3rem] p-10 space-y-8">
        {selectedMsg ? (
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-emerald-500">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">{selectedMsg.title}</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{selectedMsg.user}</p>
                      <div className="w-1 h-1 rounded-full bg-zinc-700" />
                      <p className="text-[10px] text-zinc-600 font-medium">{selectedMsg.email} • {selectedMsg.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">14:20</span>
                  <button 
                    onClick={() => { setSelectedMsg(null); }}
                    className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/30">
                {selectedMsg.content}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-white">Yanıt Gönder</h3>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  Alıcı: {selectedMsg.user}
                </span>
              </div>
              <textarea 
                placeholder={`${selectedMsg.user} kullanıcısına yanıt yazın...`}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] py-6 px-8 text-sm text-white outline-none focus:border-emerald-500 transition-all resize-none"
              />
              <div className="flex justify-end">
                <button className="flex items-center gap-3 px-12 py-5 bg-emerald-500 text-black rounded-2xl font-black text-sm hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20">
                  <Send size={18} />
                  Yanıtı Gönder
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 flex items-center justify-center text-zinc-700">
              <MessageSquare size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Mesaj Seçin</h3>
              <p className="text-zinc-500 text-sm max-w-xs">İçeriği görüntülemek ve yanıtlamak için aşağıdan bir mesaj seçin.</p>
            </div>
          </div>
        )}
      </div>

      {/* Inbox with Tabs & Pagination */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-[3rem] overflow-hidden">
        <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex gap-4">
            <button 
              onClick={() => { setMsgFilter('all'); setMsgPage(1); }}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                msgFilter === 'all' ? 'bg-zinc-900 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Tümü
            </button>
            <button 
              onClick={() => { setMsgFilter('normal'); setMsgPage(1); }}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                msgFilter === 'normal' ? 'bg-zinc-900 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Normal
            </button>
            <button 
              onClick={() => { setMsgFilter('toxic'); setMsgPage(1); }}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                msgFilter === 'toxic' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-zinc-500 hover:text-red-400'
              }`}
            >
              Toksikler
            </button>
          </div>
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Mesaj Listesi</span>
        </div>

        <div className="divide-y divide-zinc-800/50">
          {mockAdminMessages
            .filter(msg => {
              if (msgFilter === 'all') return true;
              if (msgFilter === 'toxic') return msg.status === 'Toksik Mesaj';
              return msg.status !== 'Toksik Mesaj';
            })
            .slice((msgPage - 1) * itemsPerPage, msgPage * itemsPerPage)
            .map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMsg(msg)}
                className={`w-full p-8 flex items-start gap-8 transition-all text-left group ${
                  selectedMsg?.id === msg.id ? 'bg-zinc-900/50' : 'hover:bg-zinc-900/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  msg.status === 'Toksik Mesaj' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}>
                  <UserIcon size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-emerald-500 transition-colors">{msg.title}</h4>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">14:20</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{msg.user}</p>
                    <div className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      msg.status === 'Cevaplandı' ? 'bg-emerald-500/10 text-emerald-500' :
                      msg.status === 'Toksik Mesaj' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>

        {/* Message Pagination */}
        <div className="p-8 border-t border-zinc-800 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(mockAdminMessages.filter(msg => {
            if (msgFilter === 'all') return true;
            if (msgFilter === 'toxic') return msg.status === 'Toksik Mesaj';
            return msg.status !== 'Toksik Mesaj';
          }).length / itemsPerPage) }).map((_, i) => (
            <button 
              key={i}
              onClick={() => setMsgPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                msgPage === i + 1 ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;

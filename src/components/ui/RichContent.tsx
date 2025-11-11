import Image from 'next/image';
import { ContentBlock } from '@/types/products';

interface RichContentProps {
  blocks: ContentBlock[];
  className?: string;
}

export default function RichContent({ blocks, className = '' }: RichContentProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, index) => {
        if (block.type === 'text') {
          // Check if the text content contains HTML tags
          const hasHtmlTags = block.content && /<(h[1-6]|ul|ol|li|p|strong|em|br)/i.test(block.content);
          
          if (hasHtmlTags) {
            return (
              <div 
                key={index} 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: block.content || '' }}
              />
            );
          }
          
          return (
            <div key={index} className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {block.content}
              </p>
            </div>
          );
        }
        
        if (block.type === 'image') {
          return (
            <div key={index} className="my-6">
              <div className="relative bg-slate-100 rounded-lg overflow-hidden max-h-96">
                <Image
                  src={block.src || '/placeholder-product.jpg'}
                  alt={block.alt || 'Product image'}
                  width={800}
                  height={600}
                  className="object-contain w-full h-auto max-h-96"
                  unoptimized={block.src?.startsWith('https://')}
                />
              </div>
              {block.caption && (
                <p className="text-sm text-slate-500 text-center mt-2 italic">
                  {block.caption}
                </p>
              )}
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
}

// Helper component for backward compatibility with string descriptions
interface SmartContentProps {
  content: string | ContentBlock[];
  className?: string;
}

export function SmartContent({ content, className = '' }: SmartContentProps) {
  // If it's a string, render as regular text or list
  if (typeof content === 'string') {
    // Check if the string contains HTML tags (safe tags only: h1-h6, ul, ol, li, p, strong, em, br)
    const hasSafeHtmlTags = /<(h[1-6]|ul|ol|li|p|strong|em|br)/i.test(content);
    
    if (hasSafeHtmlTags) {
      return (
        <div 
          className={`prose prose-slate max-w-none ${className}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    // Check if the string contains FAQ format (Q: ... A: ...)
    if (content.includes('Q:') && content.includes('A:')) {
      // Split by Q: and process each question-answer pair
      const qaPairs = content.split('Q:').filter(item => item.trim().length > 0);
      
      return (
        <div className={`space-y-4 ${className}`}>
          {qaPairs.map((pair, index) => {
            const [question, ...answerParts] = pair.split('A:');
            const answer = answerParts.join('A:').trim();
            
            return (
              <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-medium text-slate-900 mb-2">
                  Q: {question.trim()}
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  A: {answer}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
    
    // Check if the string contains bullet points (•)
    if (content.includes('•')) {
      const items = content.split('•').map(item => item.trim()).filter(item => item.length > 0);
      
      return (
        <div className={`prose prose-slate max-w-none ${className}`}>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-slate-700 leading-relaxed flex items-start">
                <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    // Regular string without bullets or FAQ format
    return (
      <div className={`prose prose-slate max-w-none ${className}`}>
        <p className="text-slate-700 leading-relaxed">
          {content}
        </p>
      </div>
    );
  }
  
  // If it's an array, render as rich content
  return <RichContent blocks={content} className={className} />;
}
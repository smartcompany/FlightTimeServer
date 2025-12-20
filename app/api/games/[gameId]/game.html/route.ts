import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

/// WebView 게임용 HTML 파일 제공
/// 서버의 games 폴더에서 실제 HTML 파일을 읽어서 제공
export async function GET(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;

    // games 폴더에서 HTML 파일 읽기
    const htmlFilePath = join(process.cwd(), 'app', 'games', `${gameId}.html`);
    
    try {
      const htmlContent = readFileSync(htmlFilePath, 'utf-8');
      
      return new NextResponse(htmlContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (fileError) {
      console.error(`Error reading HTML file for ${gameId}:`, fileError);
      return NextResponse.json(
        { error: `HTML file not found for game: ${gameId}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error serving HTML game:', error);
    return NextResponse.json(
      { error: 'Failed to serve HTML game' },
      { status: 500 }
    );
  }
}

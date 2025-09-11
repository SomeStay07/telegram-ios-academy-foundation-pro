#!/usr/bin/env node
import path from 'node:path';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import fetch from 'node-fetch';

const { like } = MatchersV3;

async function generatePactContract() {
  console.log('🔄 Generating Pact contract for MiniApp → LessonsAPI');
  
  const provider = new PactV3({ 
    consumer: 'MiniApp', 
    provider: 'LessonsAPI', 
    dir: path.resolve(process.cwd(), 'tests/contracts/pacts'),
    logLevel: 'info'
  });

  try {
    console.log('📋 Setting up contract for GET /api/lessons/:id');
    
    await provider.given('lesson swift-variables-constants exists')
      .uponReceiving('a request for the lesson')
      .withRequest({ 
        method: 'GET', 
        path: '/api/lessons/swift-variables-constants',
        headers: {
          'Accept': 'application/json'
        }
      })
      .willRespondWith({ 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }, 
        body: like({ 
          data: like({
            meta: like({ 
              id: 'swift-variables-constants',
              title: 'Swift Variables and Constants',
              description: like('Learn about variables and constants in Swift')
            }),
            modules: like([
              like({
                type: 'concept',
                id: like('concept-1'),
                content: like('Variables in Swift are...')
              })
            ])
          }),
          success: true,
          message: null
        }) 
      })
      .executeTest(async (mock) => {
        console.log('🌐 Testing contract against mock server:', mock.url);
        
        const response = await fetch(mock.url + '/api/lessons/swift-variables-constants', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.status !== 200) {
          throw new Error(`Expected status 200, got ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Contract test passed:', {
          status: response.status,
          hasData: !!data.data,
          lessonId: data.data?.meta?.id
        });
      });

    console.log('✅ Pact contract generated successfully');
  } catch (error) {
    console.error('❌ Pact contract generation failed:', error.message);
    process.exit(1);
  }
}

// Run contract generation if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePactContract().catch(console.error);
}